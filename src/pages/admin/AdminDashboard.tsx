import { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { useSystemStore } from '../../store/systemStore';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export const AdminDashboard = () => {
  const { activeTab, setActiveTab } = useAdminStore();
  const addLog = useSystemStore(state => state.addLog);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    addLog('{">"} Ejecutando inyección en MongoDB...');

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        addLog('{">"} [SUCCESS] Servicio añadido al clúster.');
        e.currentTarget.reset();
      } else {
        const err = await res.json();
        addLog(`{">"} [ERROR] ${err.error}`);
      }
    } catch (error) {
      addLog('{">"} [FATAL] Fallo de red.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar de Control */}
      <aside className="lg:col-span-1 space-y-4">
        <div className="border border-console-gray bg-[#353534] p-4">
          <h2 className="text-sm font-bold border-b border-red-500 text-red-500 pb-2 mb-3">~ /root_access</h2>
          <ul className="text-xs space-y-3 text-console-gray font-mono">
            <li 
              onClick={() => setActiveTab('services')}
              className={`cursor-pointer transition-colors ${activeTab === 'services' ? 'text-console-green' : 'hover:text-console-white'}`}
            >
              {">"} ./gestionar_catalogo.sh
            </li>
            <li 
              onClick={() => setActiveTab('orders')}
              className={`cursor-pointer transition-colors ${activeTab === 'orders' ? 'text-console-green' : 'hover:text-console-white'}`}
            >
              {">"} ./verificar_pagos.sh
            </li>
            <li 
              onClick={() => setActiveTab('users')}
              className={`cursor-pointer transition-colors ${activeTab === 'users' ? 'text-console-green' : 'hover:text-console-white'}`}
            >
              {">"} ./auditar_usuarios.sh
            </li>
            <li onClick={handleLogout} className="hover:text-red-500 cursor-pointer mt-4 pt-2 border-t border-console-gray">
              {">"} sudo kill_session
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="lg:col-span-3 border border-console-gray bg-[#1a1a19] p-6">
        
        {/* VISTA: SERVICIOS */}
        {activeTab === 'services' && (
          <section>
            <h2 className="text-xl font-bold text-console-green mb-4">{">"} INYECCIÓN DE SERVICIOS (MongoDB)</h2>
            <form onSubmit={handleAddService} className="space-y-4 bg-[#353534] p-4 border border-console-gray">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-console-green">Nombre del Servicio</label>
                  <input name="name" required className="bg-transparent border-b border-console-gray text-console-white text-sm outline-none focus:border-console-green py-1" placeholder="Ej: UnlockTool..." />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-console-green">Categoría</label>
                  <input name="category" required className="bg-transparent border-b border-console-gray text-console-white text-sm outline-none focus:border-console-green py-1" placeholder="Ej: unlock, software..." />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-console-green">Precio (USD)</label>
                  <input name="price" type="number" step="0.01" required className="bg-transparent border-b border-console-gray text-console-white text-sm outline-none focus:border-console-green py-1" placeholder="Ej: 15.50" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-console-green">Tiempo (Horas, Meses, Años)</label>
                  <input name="time" required className="bg-transparent border-b border-console-gray text-console-white text-sm outline-none focus:border-console-green py-1" placeholder="Ej: 6 Meses" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="mt-4 border border-console-green text-console-green px-4 py-2 text-xs font-bold hover:bg-console-green hover:text-[#1a1a19] transition-colors disabled:opacity-50">
                {isSubmitting ? '[ PROCESANDO... ]' : '[ INSERTAR EN BD ]'}
              </button>
            </form>
          </section>
        )}

        {/* VISTA: ÓRDENES */}
        {activeTab === 'orders' && (
          <section>
            <h2 className="text-xl font-bold text-console-green mb-4">{">"} COLA DE COMPROBANTES (Firestore)</h2>
            <div className="text-xs text-console-gray border-l-2 border-red-500 pl-3">
              <p>Esperando conexión al pipeline de Cloudinary para renderizar imágenes...</p>
              <p className="mt-2 text-console-white">Status: <span className="text-yellow-500">PENDING_IMPLEMENTATION</span></p>
            </div>
          </section>
        )}

        {/* VISTA: USUARIOS */}
        {activeTab === 'users' && (
          <section>
            <h2 className="text-xl font-bold text-console-green mb-4">{">"} REGISTRO DE ENTIDADES (Firestore)</h2>
            <div className="text-xs text-console-gray border-l-2 border-red-500 pl-3">
              <p>Esperando extracción de base de datos de usuarios de Firebase...</p>
              <p className="mt-2 text-console-white">Status: <span className="text-yellow-500">PENDING_IMPLEMENTATION</span></p>
            </div>
          </section>
        )}

      </main>
    </div>
  );
};