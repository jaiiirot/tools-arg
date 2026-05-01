const EN_ES_DICTIONARY: Record<string, string> = {
  "Months": "Meses",
  "Month": "Mes",
  "Years": "Años",
  "Year": "Año",
  "Hours": "Horas",
  "Hour": "Hora",
  "Minutes": "Minutos",
  "Minute": "Minuto",
  "Activation": "Activación",
  "Renew": "Renovación",
  "Credits": "Créditos",
  "Existing User": "Usuario Existente",
  "New User": "Usuario Nuevo",
  "Without Box": "Sin Caja",
  "Digital license": "Licencia Digital",
  "Instant": "Al Instante",
  "Refill": "Recarga",
  "Server": "Servidor",
  "Unlock": "Desbloqueo"
};

/**
 * Traduce términos técnicos de inglés a español basándose en un diccionario estricto.
 */
export const translateTerm = (text: string): string => {
  if (!text) return "";
  
  let translatedText = text;
  
  // Ordenar por longitud descendente para evitar reemplazos parciales (ej. Month vs Months)
  const keys = Object.keys(EN_ES_DICTIONARY).sort((a, b) => b.length - a.length);
  
  for (const key of keys) {
    // Regex para coincidencia de palabra exacta, ignorando mayúsculas/minúsculas
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    translatedText = translatedText.replace(regex, (match) => {
      // Intentar mantener la capitalización original si es posible
      const translated = EN_ES_DICTIONARY[key];
      return match.charAt(0) === match.charAt(0).toUpperCase() 
        ? translated.charAt(0).toUpperCase() + translated.slice(1) 
        : translated.toLowerCase();
    });
  }
  
  return translatedText;
};