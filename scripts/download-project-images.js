import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const STRAPI_URL = process.env.STRAPI_URL;
const PROJECTS_API = `${STRAPI_URL}/api/projects?populate=*`;

const downloadImage = async (url, name) => {
  const dir = './public/uploads';
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
    // Crea un array con tutte le immagini (main_image + gallery)
    const allImages = [];
    
    // Verifica e aggiungi main_image se esiste
    if (project.main_image) {
        allImages.push(project.main_image);
    }
    
    // Verifica e aggiungi le immagini della gallery se esistono
    if (project.gallery && Array.isArray(project.gallery)) {
        allImages.push(...project.gallery);
    }
    
    console.log(`Progetto ${project.title || 'Senza titolo'}:`, 
                `trovate ${allImages.length} immagini`);
    
    // Processa ogni immagine
    for (const img of allImages) {
        if (!img) continue;
        
        const imgUrl = img.url;
        const imgName = img.hash + img.ext;
        
        if (imgUrl && imgName) {
            const fullUrl = imgUrl.startsWith('http') ? imgUrl : `${STRAPI_URL}${imgUrl}`;
            await downloadImage(fullUrl, imgName);
        }
    }
}

  console.log('✅ Completato!');
})();
