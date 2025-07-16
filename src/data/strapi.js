export async function getProjects() {
  try {
    const response = await fetch('http://161.97.75.180:1338/api/projects?populate=*');
    // const response = await fetch('https://timely-cow-17218bd8b1.strapiapp.com/api/projects?customPopulate=nested');
    
    
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
