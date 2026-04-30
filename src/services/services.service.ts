import NodeCache from 'node-cache';
import clientPromise from '../lib/mongodb';
import { processServiceData } from './data-filter.service';

// Caché configurada para expirar cada 5 minutos (300 segundos)
const serviceCache = new NodeCache({ stdTTL: 300 });

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: string;
  time: string;
}

export const getAvailableServices = async (): Promise<ServiceItem[]> => {
  const cacheKey = "all_services";
  const cachedData = serviceCache.get<ServiceItem[]>(cacheKey);

  if (cachedData) {
    console.log("> [CACHE] Hits: Obteniendo servicios de la memoria.");
    return cachedData;
  }

  console.log("> [DB] Obteniendo servicios de MongoDB...");
  const client = await clientPromise;
  const db = client.db('toolsArg');
  
  // Extraemos todos los servicios y los pasamos por el filtro/traductor
  const rawServices = await db.collection('services').find({}).toArray();
  
  const processedServices = rawServices
    .map(service => ({
      id: service._id.toString(),
      name: processServiceData(service.name).text,
      category: service.category || 'general',
      price: service.price,
      time: processServiceData(service.time).text
    }))
    // Filtro estricto: Solo horas, meses, años
    .filter(service => processServiceData(service.time).shouldShow);

  // Guardamos en caché
  serviceCache.set(cacheKey, processedServices);

  return processedServices;
};