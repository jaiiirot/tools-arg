import { useState } from 'react';
import { useSystemStore } from '../../../store/systemStore';

export const ServiceManager = () => {
  const { addLog, dolarRate } = useSystemStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usdInput, setUsdInput] = useState('');

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // ... (Tu lógica de envío POST a /api/services se mantiene igual)
    setTimeout(() => setIsSubmitting(false), 1000); // Mock temporal para UI
  };

  return (
    <section className="animate-fade-in font-mono">
      <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-sys-border pb-2 text-sys-text">INJECT_PAYLOAD (CATALOG)</h2>
      <form onSubmit={handleAdd} className="flex flex-col gap-6 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          <div className="flex flex-col gap-1 relative">
            <label className="text-[10px] text-sys-muted uppercase tracking-widest">// SRV_NAME</label>
            <div className="flex items-center border-b border-sys-border focus-within:border-sys-accent transition-colors">
              <span className="text-sys-accent mr-2">{">"}</span>
              <input name="name" required className="bg-transparent py-2 w-full text-sm outline-none text-sys-text placeholder-sys-muted/30" placeholder="Ej: KEYLOGGER_PREMIUM" />
            </div>
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="text-[10px] text-sys-muted uppercase tracking-widest">// CATEGORY</label>
            <div className="flex items-center border-b border-sys-border focus-within:border-sys-accent transition-colors">
              <span className="text-sys-accent mr-2">{">"}</span>
              <input name="category" required className="bg-transparent py-2 w-full text-sm outline-none text-sys-text placeholder-sys-muted/30" placeholder="Ej: OFENSIVA" />
            </div>
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="text-[10px] text-sys-muted uppercase tracking-widest">// PRICE (USDT)</label>
            <div className="flex items-center border-b border-sys-border focus-within:border-sys-accent transition-colors">
              <span className="text-sys-accent mr-2">{">"}</span>
              <input 
                name="price" type="number" step="0.01" required 
                value={usdInput} onChange={(e) => setUsdInput(e.target.value)}
                className="bg-transparent py-2 w-full text-sm outline-none text-sys-text" 
              />
              {usdInput && (
                <span className="absolute right-0 top-8 text-[10px] text-[#ff9900] bg-black px-1 border border-[#ff9900]">
                  ≈ ARS ${(parseFloat(usdInput) * dolarRate).toLocaleString('es-AR')}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="text-[10px] text-sys-muted uppercase tracking-widest">// EXECUTION_TIME</label>
            <div className="flex items-center border-b border-sys-border focus-within:border-sys-accent transition-colors">
              <span className="text-sys-accent mr-2">{">"}</span>
              <input name="time" required className="bg-transparent py-2 w-full text-sm outline-none text-sys-text placeholder-sys-muted/30" placeholder="Ej: 24_HORAS" />
            </div>
          </div>

        </div>
        
        <div className="pt-6">
          <button type="submit" disabled={isSubmitting} className="text-xs uppercase tracking-widest border border-sys-accent text-sys-accent px-6 py-3 hover:bg-sys-accent hover:text-black transition-all disabled:opacity-50 w-full sm:w-auto">
            {isSubmitting ? '[ EXECUTING... ]' : '[ DEPLOY_SERVICE ]'}
          </button>
        </div>
      </form>
    </section>
  );
};