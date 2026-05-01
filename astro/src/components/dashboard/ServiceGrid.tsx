import { useState } from 'react';
import { ServiceCard } from '../services/ServiceCard';
import type { ServiceItem } from '../../services/services.service';
import { Box } from '../ui/Box';

interface Props {
  initialServices: ServiceItem[];
}

export const ServiceGrid = ({ initialServices }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = initialServices.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-6">
      {/* Buscador Neo-Brutalista */}
      <Box className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
        <div className="text-[10px] text-sys-muted uppercase tracking-widest font-bold whitespace-nowrap">
          Buscar /
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nombre del servicio..."
          className="bg-transparent border-b border-sys-border focus:border-sys-accent outline-none text-sys-text w-full text-sm placeholder-sys-muted pb-1 transition-colors"
        />
        <div className="text-[10px] text-sys-muted whitespace-nowrap">
          Resultados: <span className="text-sys-accent font-bold">{filteredServices.length}</span>
        </div>
      </Box>

      {/* Grid de resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
};