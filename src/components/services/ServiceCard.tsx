import { useState } from 'react';
import { useSystemStore } from '../../store/systemStore';
import type { ServiceItem } from '../../services/services.service';

export const ServiceCard = ({ id, name, price, time }: ServiceItem) => {
  const [isUploading, setIsUploading] = useState(false);
  const addLog = useSystemStore((state) => state.addLog);

  const handleExecute = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    addLog(`> Procesando orden: ${name}...`);
    addLog(`> Encriptando comprobante...`);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        addLog(`> [SUCCESS] Orden creada. Ticket ID: #${Math.floor(Math.random() * 10000)}`);
      } else {
        addLog(`> [ERROR] El servidor rechazó la solicitud.`);
      }
    } catch (error) {
      addLog('> [FATAL] Error de conexión con el host.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <article className="border border-console-gray bg-[#353534] p-4 flex flex-col justify-between h-full transition-all duration-300 hover:border-console-green group">
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2 border-b border-console-gray pb-2">
          <h3 className="font-bold text-console-white group-hover:text-console-green transition-colors text-sm">
            {/* ESCAPADO AQUÍ */}
            {">"} {name}
          </h3>
          <span className="text-[10px] bg-console-gray text-console-white px-2 py-1 rounded whitespace-nowrap ml-2">
            {time}
          </span>
        </div>
        <div className="mt-4 flex justify-between items-end">
          <p className="text-xs text-console-gray">Costo_estimado:</p>
          <p className="font-bold text-console-green text-lg">{price}</p>
        </div>
      </div>
      
      <form onSubmit={handleExecute} className="mt-auto border-t border-dashed border-console-gray pt-4 flex flex-col gap-3">
        <input type="hidden" name="serviceId" value={id} />
        <input type="hidden" name="serviceName" value={name} />
        
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-console-green">~/comprobante.jpg</label>
          <input 
            type="file" 
            name="receipt" 
            accept="image/jpeg, image/png, image/webp"
            required 
            disabled={isUploading}
            className="text-[10px] w-full text-console-white file:mr-2 file:py-1 file:px-2 file:border-0 file:bg-console-green file:text-console-bg hover:file:bg-console-white file:cursor-pointer file:transition-colors disabled:opacity-50" 
          />
        </div>

        <button 
          type="submit" 
          disabled={isUploading}
          className="border border-console-green text-console-green px-3 py-1 text-xs hover:bg-console-green hover:text-[#353534] transition-colors font-bold tracking-tighter disabled:opacity-50 disabled:cursor-not-allowed w-full mt-2"
        >
          {isUploading ? '[ EJECUTANDO... ]' : '[ CONFIRMAR PAGO ]'}
        </button>
      </form>
    </article>
  );
};