import React from 'react';
import { TmuxLayout } from '../../components/templates/TmuxLayout';
import { TerminalText } from '../../components/atoms/TerminalText';
import { useAuthStore } from '../../store/authStore';

export const AdminDashboard: React.FC = () => {
  useAuthStore((state) => state.user);

  return (
    <TmuxLayout title="Admin Root">
      <div className="p-6">
        <header className="mb-8">
          <TerminalText text="> sudo su - admin" className="text-2xl font-bold text-green-400" />
          <p className="text-gray-400 mt-2">
            Sesión iniciada como root. Bienvenido al panel de control.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 border border-green-500/30 bg-green-900/10 rounded">
            <h3 className="text-gray-400 text-sm">Tráfico de Red</h3>
            <p className="text-2xl text-green-400 font-mono mt-1">1.2 TB</p>
          </div>
          <div className="p-4 border border-green-500/30 bg-green-900/10 rounded">
            <h3 className="text-gray-400 text-sm">Órdenes Activas</h3>
            <p className="text-2xl text-yellow-400 font-mono mt-1">42</p>
          </div>
          <div className="p-4 border border-green-500/30 bg-green-900/10 rounded">
            <h3 className="text-gray-400 text-sm">Alertas de Sistema</h3>
            <p className="text-2xl text-red-400 font-mono mt-1">0</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-green-400 mb-4 border-b border-green-500/20 pb-2">
          Servicios Rápidos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 border border-green-500/30 bg-green-900/10 rounded">
            <h3 className="text-lg font-bold text-green-400">Gestión de Cursos</h3>
            <p className="text-gray-400 mt-2">Crear, editar o archivar módulos de estudio.</p>
            <button className="mt-4 px-4 py-2 border border-green-500/40 text-green-400 rounded">
              Administrar
            </button>
          </div>
          <div className="p-5 border border-green-500/30 bg-green-900/10 rounded">
            <h3 className="text-lg font-bold text-green-400">Gestión de Inventario</h3>
            <p className="text-gray-400 mt-2">Actualizar stock y precios de productos.</p>
            <button className="mt-4 px-4 py-2 border border-green-500/40 text-green-400 rounded">
              Administrar
            </button>
          </div>
        </div>
      </div>
    </TmuxLayout>
  );
};

export default AdminDashboard;