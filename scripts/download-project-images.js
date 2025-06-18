// scripts/download-project-images.js

import fs from 'fs';
import fetch from 'node-fetch';

const STRAPI_URL = 'http://localhost:1337'; // Cambia se usi ambiente online
const PROJECTS_API = `${STRAPI_URL}/api/projects?populate=*`; // Assicurati che le immagini siano incluse

const downloadImage = async (url, name) => {
  const dir = './public/project-images';
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
  console.log('📡 Recupero progetti da Strapi...');
  const res = await fetch(PROJECTS_API);
  const json = await res.json();

  const projects = json.data;

  for (const project of projects) {
    const image = project.attributes?.image?.data; // Cambia il campo se necessario

    if (!image) continue;

    const images = Array.isArray(image) ? image : [image];

    for (const img of images) {
      const imgUrl = img.attributes?.url;
      const imgName = img.attributes?.name;

      if (imgUrl && imgName) {
        const fullUrl = imgUrl.startsWith('http') ? imgUrl : `${STRAPI_URL}${imgUrl}`;
        await downloadImage(fullUrl, imgName);
      }
    }
  }

  console.log('✅ Completato!');
})();
