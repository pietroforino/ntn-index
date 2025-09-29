import dotenv from "dotenv";

dotenv.config();

const STRAPI_MEDIA_BASE = process.env.STRAPI_URL;

// const STRAPI_MEDIA_BASE = 'http://localhost:1337';

export async function getProjects() {
  try {
    const response = await fetch(
      STRAPI_MEDIA_BASE + "/api/projects?populate=*"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("Dati ricevuti da Strapi:", data);

    return data.data;
  } catch (error) {
    console.error("Errore durante il fetch dei progetti da Strapi:", error);
    return [];
  }
}

export async function getInformations() {
  try {
    const response = await fetch(STRAPI_MEDIA_BASE + "/api/about?populate=*");

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("Dati ricevuti da Strapi:", data);

    return data.data;
  } catch (error) {
    console.error("Errore durante il fetch dei progetti da Strapi:", error);
    return [];
  }
}

export async function getContacts() {
  try {
    const response = await fetch(STRAPI_MEDIA_BASE + "/api/contact?populate=*");

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("Dati ricevuti da Strapi:", data);

    return data.data;
  } catch (error) {
    console.error("Errore durante il fetch dei progetti da Strapi:", error);
    return [];
  }
}
