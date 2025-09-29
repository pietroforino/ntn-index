import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const STRAPI_URL = process.env.STRAPI_URL;
const PROJECTS_API = `${STRAPI_URL}/api/projects?populate=*`;
const CONTACT_API = `${STRAPI_URL}/api/about?populate=*`;

const downloadImage = async (url, name) => {
  const dir = "./public/uploads";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = `${dir}/${name}`;
  if (fs.existsSync(filePath)) {
    console.log(`✔️  Già esiste: ${name}`);
    return;
  }

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`❌ Errore nel download: ${url}`);
    return;
  }

  const buffer = await res.buffer();
  fs.writeFileSync(filePath, buffer);
  console.log(`⬇️  Scaricata: ${name}`);
};

(async () => {
  console.log("📡 Recupero progetti da Strapi...");
  const res = await fetch(PROJECTS_API);
  const json = await res.json();

  const cntcs = await fetch(CONTACT_API);
  const json_cntcs = await cntcs.json();

  const projects = json.data;
  const contacts = json_cntcs.data;
  const imgstodownload = [...projects, contacts];

  for (const project of imgstodownload) {
    const allImages = [];
    if (project.main_image) {
      allImages.push(project.main_image);
    } else if (project.about_image) {
      allImages.push(project.about_image);
    }

    if (project.gallery && Array.isArray(project.gallery)) {
      allImages.push(...project.gallery);
    }

    for (const img of allImages) {
      if (!img) continue;

      const imgUrl = img.url;
      const imgName = img.hash + img.ext;

      if (imgUrl && imgName) {
        const fullUrl = imgUrl.startsWith("http")
          ? imgUrl
          : `${STRAPI_URL}${imgUrl}`;
        await downloadImage(fullUrl, imgName);
      }
    }
  }

  console.log("✅ Completato!");
})();
