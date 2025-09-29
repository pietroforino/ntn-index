import dotenv from "dotenv";

dotenv.config();

// const STRAPI_MEDIA_BASE = process.env.STRAPI_URL;

const STRAPI_MEDIA_BASE = "http://localhost:1338";

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

export async function getOrderedProjects() {
  try {
    // Fetch di tutti i progetti
    const projectsResponse = await fetch(
      STRAPI_MEDIA_BASE + "/api/projects?populate=*"
    );
    if (!projectsResponse.ok) throw new Error(projectsResponse.statusText);
    const projectsData = await projectsResponse.json();
    const projects = projectsData.data;

    // Fetch della homepage per ottenere l'ordine
    const homepageResponse = await fetch(
      STRAPI_MEDIA_BASE + "/api/homepage?populate=*"
    );
    if (!homepageResponse.ok) throw new Error(homepageResponse.statusText);
    const homepageData = await homepageResponse.json();
    const homepageProjects = homepageData.data.projects;

    // Creiamo una mappa dei progetti per id
    const projectsMap = new Map(projects.map((proj) => [proj.id, proj]));

    // Riordiniamo i progetti secondo l'ordine della homepage
    const orderedProjects = homepageProjects
      .map((hpProj) => projectsMap.get(hpProj.id))
      .filter(Boolean); // filtriamo eventuali id mancanti

    return orderedProjects;
  } catch (error) {
    console.error("Errore durante il fetch dei progetti ordinati:", error);
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
