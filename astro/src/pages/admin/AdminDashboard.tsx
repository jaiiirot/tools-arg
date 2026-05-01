import { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { useSystemStore } from '../../store/systemStore';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Box } from '../../components/ui/Box';
import { Button } from '../../components/ui/Button';

export const AdminDashboard = () => {
  const { activeTab, setActiveTab } = useAdminStore();
  const addLog = useSystemStore(state => state.addLog);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = () => {
    signOut(auth);
    window.location.href = '/';
  };

  const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    addLog('[SISTEMA] Inyectando datos en DB...');

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))
      });

      if (res.ok) {
        addLog('[ÉXITO] Registro insertado.');
        e.currentTarget.reset();
      } else {
        addLog('[ERROR] Datos rechazados por la API.');
      }
    } catch (error) {
      addLog('[FATAL] Conexión perdida.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
      {/* Sidebar de Control */}
      <aside className="lg:col-span-1 space-y-6">
        <Box>
          <div className="text-[10px] text-[#FF4444] uppercase mb-4 tracking-widest font-bold">Nivel de Acceso: ROOT</div>
          <nav className="flex flex-col text-xs uppercase tracking-widest font-bold">
            <button onClick={() => setActiveTab('services')} className={`text-left border-b border-sys-border py-3 transition-colors ${activeTab === 'services' ? 'text-sys-accent' : 'hover:text-sys-text text-sys-muted'}`}>Catálogo</button>
            <button onClick={() => setActiveTab('orders')} className={`text-left border-b border-sys-border py-3 transition-colors ${activeTab === 'orders' ? 'text-sys-accent' : 'hover:text-sys-text text-sys-muted'}`}>Órdenes</button>
            <button onClick={() => setActiveTab('users')} className={`text-left border-b border-sys-border py-3 transition-colors ${activeTab === 'users' ? 'text-sys-accent' : 'hover:text-sys-text text-sys-muted'}`}>Usuarios</button>
            <button onClick={handleLogout} className="text-left py-3 mt-4 text-[#FF4444] hover:bg-[#FF4444] hover:text-sys-bg px-2 transition-colors">
              Cerrar Conexión
            </button>
          </nav>
        </Box>
      </aside>

      {/* Main Workspace */}
      <main className="lg:col-span-3">
        <Box className="min-h-[60vh] p-8">
          
          {activeTab === 'services' && (
            <section className="animate-fade-in">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-sys-border pb-4">Añadir Nuevo Servicio</h2>
              <form onSubmit={handleAddService} className="flex flex-col gap-6 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-sys-muted uppercase font-bold">Nombre del Servicio</label>
                    <input name="name" required className="bg-sys-bg border border-sys-border focus:border-sys-accent px-3 py-2 text-sm outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-sys-muted uppercase font-bold">Categoría</label>
                    <input name="category" required className="bg-sys-bg border border-sys-border focus:border-sys-accent px-3 py-2 text-sm outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-sys-muted uppercase font-bold">Precio (USD)</label>
                    <input name="price" type="number" step="0.01" required className="bg-sys-bg border border-sys-border focus:border-sys-accent px-3 py-2 text-sm outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-sys-muted uppercase font-bold">Tiempo Estimado</label>
                    <input name="time" required placeholder="Ej: 6 Meses" className="bg-sys-bg border border-sys-border focus:border-sys-accent px-3 py-2 text-sm outline-none" />
                  </div>
                </div>
                <div className="pt-4 max-w-xs">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Procesando...' : 'Insertar en Base de Datos'}
                  </Button>
                </div>
              </form>
            </section>
          )}

          {activeTab === 'orders' && (
            <section className="animate-fade-in">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-sys-border pb-4">Cola de Procesamiento</h2>
              <div className="text-sys-muted text-sm">Esperando conexión al pipeline de Cloudinary...</div>
            </section>
          )}

          {activeTab === 'users' && (
            <section className="animate-fade-in">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-sys-border pb-4">Auditoría de Usuarios</h2>
              <div className="text-sys-muted text-sm">Esperando extracción de base de datos...</div>
            </section>
          )}

        </Box>
      </main>
    </div>
  );
};