import { translateTerm } from './translator.service';
import { SITE_CONFIG } from '../config/site.config';

/**
 * Procesa un nombre o descripción técnica: traduce y valida si cumple el filtro de tiempo.
 */
export const processServiceData = (rawData: string) => {
  const translated = translateTerm(rawData);
  
  // Validar si contiene alguna de las palabras permitidas (horas, meses, años)
  const isAllowed = SITE_CONFIG.allowedTimeFilters.some(filter => 
    translated.toLowerCase().includes(filter)
  );

  return {
    text: translated,
    shouldShow: isAllowed
  };
};