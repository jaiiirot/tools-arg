import { useState } from 'react';
import { ServiceCard } from '../services/ServiceCard';
import type { ServiceItem } from '../../services/services.service';

interface Props {
  initialServices: ServiceItem[];
}

export const ServiceGrid = ({ initialServices }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = initialServices.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-4">
      {/* Buscador estilo CLI */}
      <div className="border border-console-gray bg-[#353534] p-3 flex items-center gap-2">
        <span className="text-console-green font-bold text-sm">./search --query="</span>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="buscar_servicio..."
          className="bg-transparent border-none outline-none text-console-white w-full text-sm font-mono placeholder-console-gray"
        />
        <span className="text-console-green font-bold text-sm">"</span>
      </div>

      <div className="mb-2">
        <p className="text-xs text-console-gray">{">"} Coincidencias encontradas: <span className="text-console-green">{filteredServices.length}</span></p>
      </div>

      {/* Grid de resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map(service => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
};