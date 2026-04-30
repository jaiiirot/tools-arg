import { useState, useEffect } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { useSystemStore } from '../../store/systemStore';
import { Box } from '../ui/Box';
import { ServiceManager } from './sections/ServiceManager';
import { OrderManager } from './sections/OrderManager';
import { UserManager } from './sections/UserManager';

export const AdminDashboard = () => {
  const { activeTab, setActiveTab } = useAdminStore();
  const addLog = useSystemStore(state => state.addLog);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
      <aside className="lg:col-span-1">
        <Box className="flex flex-col text-xs font-bold uppercase tracking-widest">
          <div className="text-[#FF4444] mb-4 border-b border-sys-border pb-2">Jerarquía: ROOT</div>
          <button onClick={() => setActiveTab('services')} className={`text-left py-3 border-b border-sys-border transition-colors ${activeTab === 'services' ? 'text-sys-accent' : 'text-sys-muted'}`}>Catálogo</button>
          <button onClick={() => setActiveTab('orders')} className={`text-left py-3 border-b border-sys-border transition-colors ${activeTab === 'orders' ? 'text-sys-accent' : 'text-sys-muted'}`}>Órdenes</button>
          <button onClick={() => setActiveTab('users')} className={`text-left py-3 transition-colors ${activeTab === 'users' ? 'text-sys-accent' : 'text-sys-muted'}`}>Usuarios</button>
        </Box>
      </aside>

      <main className="lg:col-span-3">
        <Box className="min-h-[60vh]">
          {activeTab === 'services' && <ServiceManager />}
          {activeTab === 'orders' && <OrderManager />}
          {activeTab === 'users' && <UserManager />}
        </Box>
      </main>
    </div>
  );
};