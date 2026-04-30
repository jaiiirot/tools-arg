export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: string;
  time: string;
}

export const getAvailableServices = async (fetcher = fetch): Promise<ServiceItem[]> => {
  try {
    // Para entornos SSR en Astro, necesitamos la URL completa si estamos en el servidor
    const baseUrl = import.meta.env.SITE_URL || 'http://localhost:4321';
    const response = await fetcher(`${baseUrl}/api/services`);
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[SYSTEM_ERROR] Falla al contactar el clúster MongoDB:", error);
    return [];
  }
};