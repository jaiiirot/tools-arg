import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useSystemStore } from '../../store/systemStore';
import { useAuthStore } from '../../store/authStore';

export const Sidebar = () => {
  const { logs, balance, addLog } = useSystemStore();
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    addLog('> [SISTEMA] Destruyendo sesión actual...');
    try {
      await signOut(auth);
      // El onAuthStateChanged global lo detectará y el ProtectedRoute redirigirá
    } catch (error) {
      addLog('> [ERROR] Fallo al cerrar el puerto seguro.');
    }
  };

  return (
    <aside className="space-y-4">
      {/* Resumen / Wallet */}
      <div className="border border-console-gray bg-[#353534] p-4">
        <h2 className="text-sm font-bold border-b border-console-gray text-console-white pb-2 mb-3">~ /wallet_overview</h2>
        <div className="space-y-2">
          {/* Mostramos el email real del usuario autenticado */}
          <p className="text-[10px] text-console-gray truncate">User: <span className="text-console-white">{user?.email || 'unknown_entity'}</span></p>
          <p className="text-[10px] text-console-gray">Status: <span className="text-console-green animate-pulse">VERIFIED</span></p>
          <div className="mt-4 pt-4 border-t border-console-gray">
            <p className="text-[10px] uppercase text-console-gray">Fondos_Actuales</p>
            <p className="text-xl font-bold text-console-green">${balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <div className="border border-console-gray bg-[#353534] p-4">
        <h2 className="text-sm font-bold border-b border-console-gray text-console-white pb-2 mb-3">~ /bin/menu</h2>
        <ul className="text-xs space-y-3 text-console-gray">
          {/* ESCAPAMOS EL CARÁCTER '>' CON {">"} PARA EVITAR ERRORES DE JSX */}
          <li className="hover:text-console-green cursor-pointer transition-colors">{">"} ./hacer_pedido.sh</li>
          <li className="hover:text-console-green cursor-pointer transition-colors">{">"} ./historial_ordenes.sh</li>
          <li className="hover:text-console-green cursor-pointer transition-colors">{">"} ./soporte_tickets.sh</li>
          {/* Comando EXIT funcional */}
          <li onClick={handleLogout} className="hover:text-red-500 cursor-pointer transition-colors mt-4 pt-2 border-t border-console-gray">{">"} exit()</li>
        </ul>
      </div>

      {/* Terminal de Logs Interactiva (Permanece igual) */}
      <div className="border border-console-gray bg-[#1a1a19] p-4 h-64 flex flex-col">
        <h2 className="text-[10px] font-bold text-console-gray mb-2 uppercase">System_Logs // StdOut</h2>
        <div className="flex-1 overflow-y-auto text-[10px] font-mono text-console-green space-y-1 pr-2">
          {logs.map((log, idx) => (
            <p key={idx} className="opacity-90">{log}</p>
          ))}
          <p className="animate-blink">_</p>
        </div>
      </div>
    </aside>
  );
};