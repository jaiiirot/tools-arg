import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useSystemStore } from "../../store/systemStore";
import { useAuthStore } from "../../store/authStore";
import { Box } from "../ui/Box";

export const Sidebar = () => {
  const { logs, balance, addLog } = useSystemStore();
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    addLog("[SISTEMA] Desconectando nodo...");
    signOut(auth);
  };

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-8">
      {/* Panel de Usuario */}
      <Box>
        <div className="text-[10px] text-sys-muted uppercase mb-1">
          ID CLIENTE
        </div>
        <div className="text-sm truncate mb-5">{user?.email || "N/A"}</div>

        <div className="text-[10px] text-sys-muted uppercase mb-1">
          FONDOS DISPONIBLES
        </div>
        <div className="text-3xl font-bold text-sys-accent">
          ${balance.toFixed(2)}
        </div>
      </Box>

      {/* Navegación Brutalista */}
      <Box>
        <nav className="flex flex-col text-xs uppercase tracking-widest font-bold">
          <button
            onClick={() => useSystemStore.getState().setClientTab("catalog")}
            className="text-left border-b border-sys-border py-3 hover:text-sys-accent transition-colors"
          >
            Nuevo Pedido
          </button>
          <button
            onClick={() => useSystemStore.getState().setClientTab("history")}
            className="text-left border-b border-sys-border py-3 hover:text-sys-accent transition-colors"
          >
            Historial
          </button>
          <button className="text-left border-b border-sys-border py-3 hover:text-sys-accent transition-colors opacity-50 cursor-not-allowed">
            Soporte
          </button>
          <button
            onClick={handleLogout}
            className="text-left py-3 mt-2 text-[#FF4444] hover:bg-[#FF4444] hover:text-sys-bg px-2 transition-colors"
          >
            Finalizar Sesión
          </button>
        </nav>
      </Box>

      {/* Activity Log Limpio */}
      <Box className="h-48 flex flex-col">
        <div className="text-[10px] text-sys-muted uppercase mb-3 border-b border-sys-border pb-2">
          ACTIVITY_LOG
        </div>
        <div className="flex-1 overflow-y-auto text-[10px] space-y-1.5 leading-relaxed text-sys-muted">
          {logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
          <div className="animate-blink text-sys-accent">_</div>
        </div>
      </Box>
    </aside>
  );
};
