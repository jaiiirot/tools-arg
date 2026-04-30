import { useState } from 'react';
import { useSystemStore } from '../../store/systemStore';

interface UploadFormProps {
  serviceId: string;
  serviceName: string;
}

export const UploadForm = ({ serviceId, serviceName }: UploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const addLog = useSystemStore((state) => state.addLog);

  const handleExecute = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    addLog(`> Iniciando subida para: ${serviceName}...`);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        addLog('> EJECUCIÓN EXITOSA. Comprobante encriptado y subido.');
      } else {
        addLog('> ERROR: Fallo en la subida del archivo.');
      }
    } catch (error) {
      addLog('> ERROR_CRÍTICO: Conexión rechazada.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleExecute} className="mt-auto border-t border-dashed border-console-gray pt-4 flex flex-col gap-3">
      <input type="hidden" name="serviceId" value={serviceId} />
      <input type="hidden" name="serviceName" value={serviceName} />
      <input type="hidden" name="userEmail" value="buyer@example.com" /> {/* Esto vendrá de tu Auth luego */}
      
      <div className="flex flex-col gap-1">
        <label className="text-[10px] text-console-white">~/adjuntar_comprobante.jpg</label>
        <input 
          type="file" 
          name="receipt" 
          accept="image/jpeg, image/png, image/webp"
          required 
          disabled={isUploading}
          className="text-[10px] w-full text-console-gray file:mr-2 file:py-1 file:px-2 file:border-0 file:bg-console-green file:text-console-bg hover:file:bg-console-white file:cursor-pointer file:transition-colors disabled:opacity-50" 
        />
      </div>

      <button 
        type="submit" 
        disabled={isUploading}
        className="border border-console-green text-console-green px-4 py-1 hover:bg-console-green hover:text-console-bg transition-all font-bold uppercase tracking-tighter disabled:opacity-50"
      >
        {isUploading ? '[ PROCESANDO... ]' : '[ EJECUTAR PAGO ]'}
      </button>
    </form>
  );
};