import dotenv from 'dotenv';

dotenv.config();

const STRAPI_MEDIA_BASE = process.env.STRAPI_URL;

export async function getProjects() {
  try {
    const response = await fetch(STRAPI_MEDIA_BASE + '/api/projects?populate=*');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("Dati ricevuti da Strapi:", data);

    return data.data; // Assicurati che questa sia la struttura corretta
  } catch (error) {
    console.error('Errore durante il fetch dei progetti da Strapi:', error);
    return [];
  }
}
