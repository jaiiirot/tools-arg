export const SITE_CONFIG = {
  name: 'toolsArg',
  version: '1.0.4-stable',
  author: 'root@toolsArg',
  systemPrefix: 'system@toolsArg:~#',
  defaultLocale: 'es-AR',
  roles: {
    ADMIN: 'admin',
    USER: 'buyer'
  },
  // Solo permitimos estos filtros de tiempo para las cards
  allowedTimeFilters: ['horas', 'meses', 'años', 'año', 'hora', 'mes']
};