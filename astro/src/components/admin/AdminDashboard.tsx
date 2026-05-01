import { useAdminStore } from '../../store/adminStore';
import { Box } from '../ui/Box';
import { ServiceManager } from './sections/ServiceManager';
import { OrderManager } from './sections/OrderManager';
import { UserManager } from './sections/UserManager';

export const AdminDashboard = () => {
  const { activeTab, setActiveTab } = useAdminStore();
  
  const navItems = [
    { id: 'services', label: './catalog_bin' },
    { id: 'orders', label: './sys_orders' },
    { id: 'users', label: './usr_registry' }
  ];

  return (
    <div className="flex flex-col gap-4 mt-4 w-full max-w-7xl mx-auto font-mono text-sm md:text-base">
      {/* HEADER TERMINAL */}
      <Box className="border-sys-accent/50 border-b-2 bg-[#1a1a1a] p-3 md:p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex flex-wrap items-center truncate w-full">
            <span className="text-sys-accent font-bold animate-pulse whitespace-nowrap">root@toolsArg:~#</span>
            <span className="ml-2 text-sys-muted truncate">./launch_admin.sh</span>
          </div>
          <div className="text-[9px] md:text-[10px] uppercase text-[#FF4444] border border-[#FF4444] px-2 py-1 tracking-widest bg-[#FF4444]/10 whitespace-nowrap">
            [ PRIVILEGE: OVERRIDE ]
          </div>
        </div>
      </Box>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* NAVEGACIÓN (Horizontal en móvil, Vertical en escritorio) */}
        <aside className="lg:w-64 shrink-0">
          <Box className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 p-3 bg-[#1a1a1a] border-sys-border">
            <div className="hidden lg:block text-[10px] text-sys-muted mb-2 border-b border-sys-border pb-2 tracking-widest">
              // ACTIVE_MODULES
            </div>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex-shrink-0 text-left px-3 py-2 text-[10px] md:text-xs uppercase transition-all duration-200 border-b-2 lg:border-b-0 lg:border-l-2 ${
                  activeTab === item.id 
                    ? 'border-sys-accent text-sys-accent bg-sys-accent/10' 
                    : 'border-transparent text-sys-muted hover:border-sys-border hover:text-sys-text'
                }`}
              >
                <span className="hidden lg:inline">{activeTab === item.id ? '> ' : '  '}</span>
                {item.label}
              </button>
            ))}
          </Box>
        </aside>

        {/* MAIN CONTENT PORTAL */}
        <main className="flex-1 min-w-0">
          <Box className="min-h-[60vh] border-t-2 border-t-sys-border bg-[#1a1a1a] relative p-3 md:p-4">
            <div className="absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-l-2 border-sys-accent"></div>
            <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 border-t-2 border-r-2 border-sys-accent"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-l-2 border-sys-accent"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-b-2 border-r-2 border-sys-accent"></div>
            
            <div className="w-full">
              {activeTab === 'services' && <ServiceManager />}
              {activeTab === 'orders' && <OrderManager />}
              {activeTab === 'users' && <UserManager />}
            </div>
          </Box>
        </main>
      </div>
    </div>
  );
};