import { useState } from 'react';
import { useSystemStore } from '../../../store/systemStore';
import { Button } from '../../ui/Button';

export const ServiceManager = () => {
  const { addLog, dolarRate } = useSystemStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usdInput, setUsdInput] = useState('');

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    addLog('[SISTEMA] Inyectando datos en clúster MongoDB...');

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
      });

      if (res.ok) {
        addLog('[ÉXITO] Servicio indexado correctamente.');
        form.reset();
        setUsdInput('');
      } else {
        addLog('[ERROR] Payload rechazado por el servidor.');
      }
    } catch (err) {
      addLog('[FATAL] Falla en la capa de persistencia.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="animate-fade-in">
      <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-sys-border pb-4">Gestión de Catálogo</h2>
      <form onSubmit={handleAdd} className="flex flex-col gap-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-sys-muted uppercase font-bold">Nombre del Servicio</label>
            <input name="name" required className="bg-sys-bg border border-sys-border focus:border-sys-accent px-3 py-2 text-sm outline-none text-sys-text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-sys-muted uppercase font-bold">Categoría</label>
            <input name="category" required className="bg-sys-bg border border-sys-border focus:border-sys-accent px-3 py-2 text-sm outline-none text-sys-text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-sys-muted uppercase font-bold">Precio (USDT)</label>
            <div className="relative flex items-center">
              <input 
                name="price" type="number" step="0.01" required 
                value={usdInput} onChange={(e) => setUsdInput(e.target.value)}
                className="bg-sys-bg border border-sys-border focus:border-sys-accent px-3 py-2 w-full text-sm outline-none text-sys-text" 
              />
              {usdInput && (
                <span className="absolute -right-4 translate-x-full text-[9px] text-sys-accent font-bold whitespace-nowrap">
                  ≈ ARS ${(parseFloat(usdInput) * dolarRate).toLocaleString('es-AR')}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-sys-muted uppercase font-bold">Tiempo Estimado</label>
            <input name="time" required placeholder="Ej: 3 Horas" className="bg-sys-bg border border-sys-border focus:border-sys-accent px-3 py-2 text-sm outline-none text-sys-text" />
          </div>
        </div>
        <div className="pt-4 max-w-xs">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Procesando...' : 'Insertar Registro'}
          </Button>
        </div>
      </form>
    </section>
  );
};