import { useState } from 'react';
import { useSystemStore } from '../../store/systemStore';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const UploadForm = ({ serviceId, serviceName }: { serviceId: string, serviceName: string }) => {
  const [isUploading, setIsUploading] = useState(false);
  const addLog = useSystemStore((state) => state.addLog);
  const user = useAuthStore((state) => state.user);

  const handleExecute = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      addLog('[ERROR] Protocolo rechazado: Sesión no válida.');
      return;
    }

    setIsUploading(true);
    addLog(`[SISTEMA] Iniciando compresión de comprobante...`);
    
    const formData = new FormData(e.currentTarget);
    formData.append('userEmail', user.email || 'unknown');
    
    try {
      // 1. Enviar imagen al Backend (Astro -> Sharp -> Cloudinary)
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok && data.url) {
        addLog('[SISTEMA] Archivo optimizado y alojado. Generando orden en DB...');
        
        // 2. Registrar la orden en Firestore
        await addDoc(collection(db, 'orders'), {
          serviceId,
          serviceName,
          userEmail: user.email,
          receiptUrl: data.url, // La URL que nos devolvió Cloudinary
          status: 'PENDING',
          createdAt: serverTimestamp()
        });

        addLog(`[ÉXITO] Orden consolidada con éxito.`);
        e.currentTarget.reset();
      } else {
        addLog(`[ERROR] ${data.error || 'Paquete rechazado.'}`);
      }
    } catch (err) {
      addLog('[FATAL] Conexión interrumpida con el clúster.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleExecute} className="mt-auto border-t border-sys-border pt-4">
      <input type="hidden" name="serviceId" value={serviceId} />
      <input type="hidden" name="serviceName" value={serviceName} />
      <input 
        type="file" name="receipt" accept="image/*" required disabled={isUploading}
        className="w-full text-[10px] text-sys-muted file:bg-sys-border file:text-sys-text file:border-0 file:px-3 file:py-1 file:mr-3 hover:file:bg-sys-accent hover:file:text-sys-bg cursor-pointer mb-4 outline-none transition-colors" 
      />
      <Button type="submit" disabled={isUploading}>
        {isUploading ? 'Procesando...' : 'Confirmar Orden'}
      </Button>
    </form>
  );
};