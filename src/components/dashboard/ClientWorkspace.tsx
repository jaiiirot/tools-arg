import { useState, useEffect } from 'react';
import { useSystemStore } from '../../store/systemStore';
import { useAuthStore } from '../../store/authStore';
import { ServiceGrid } from './ServiceGrid';
import { Box } from '../ui/Box';
import { db } from '../../lib/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import type { ServiceItem } from '../../services/services.service';

interface Props {
  initialServices: ServiceItem[];
}

export const ClientWorkspace = ({ initialServices }: Props) => {
  const clientTab = useSystemStore((state) => state.clientTab);
  const user = useAuthStore((state) => state.user);
  
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (clientTab === 'history' && user?.email) {
      setLoadingHistory(true);
      const fetchHistory = async () => {
        try {
          const q = query(
            collection(db, 'orders'),
            where('userEmail', '==', user.email),
            orderBy('createdAt', 'desc')
          );
          const snap = await getDocs(q);
          setMyOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error al extraer historial:", error);
        } finally {
          setLoadingHistory(false);
        }
      };
      fetchHistory();
    }
  }, [clientTab, user]);

  return (
    <>
      {clientTab === 'catalog' && (
        <div className="animate-fade-in">
          <ServiceGrid initialServices={initialServices} />
        </div>
      )}

      {clientTab === 'history' && (
        <Box className="min-h-[60vh] animate-fade-in">
          <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-sys-border pb-4">Historial de Operaciones</h2>
          
          {loadingHistory ? (
            <div className="text-[10px] text-sys-muted uppercase tracking-widest">Extrayendo datos clasificados...</div>
          ) : myOrders.length === 0 ? (
            <div className="text-[10px] text-sys-muted border-l-2 border-sys-border pl-3">No existen registros de operaciones.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {myOrders.map(order => (
                <div key={order.id} className="border border-sys-border p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-sys-muted transition-colors">
                  <div className="truncate w-full sm:w-auto">
                    <div className="text-[9px] text-sys-muted uppercase tracking-widest">TICKET: #{order.id.slice(-6)}</div>
                    <div className="font-bold text-sm truncate">{order.serviceName}</div>
                  </div>
                  <div className={`text-[9px] font-bold px-3 py-1.5 uppercase tracking-widest whitespace-nowrap ${
                    order.status === 'PENDING' ? 'border border-[#ff9900] text-[#ff9900]' :
                    order.status === 'APPROVED' ? 'bg-sys-accent text-sys-bg' :
                    'bg-[#FF4444] text-sys-bg'
                  }`}>
                    {order.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Box>
      )}
    </>
  );
};