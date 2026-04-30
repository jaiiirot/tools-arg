import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useSystemStore } from '../../../store/systemStore';
import { Box } from '../../ui/Box';
import { Button } from '../../ui/Button';

export const OrderManager = () => {
  const { addLog } = useSystemStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      addLog('[ERROR] No se pudo leer la matriz de órdenes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleUpdate = async (order: any, status: 'APPROVED' | 'REJECTED') => {
    addLog(`[SISTEMA] Actualizando estado: ${order.id}...`);
    try {
      await updateDoc(doc(db, 'orders', order.id), { status });
      
      // DISPARAR NOTIFICACIÓN POR EMAIL
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: order.userEmail,
          serviceName: order.serviceName,
          status
        })
      });

      addLog(`[ÉXITO] Orden ${status}. Usuario notificado.`);
      fetchOrders();
    } catch (err) {
      addLog('[ERROR] Fallo al sincronizar cambio.');
    }
  };

  return (
    <section className="animate-fade-in">
      <div className="flex justify-between items-center mb-6 border-b border-sys-border pb-4">
        <h2 className="text-lg font-bold uppercase tracking-widest">Cola de Órdenes</h2>
        <button onClick={fetchOrders} className="text-[10px] text-sys-muted hover:text-sys-accent uppercase border border-sys-border px-2 py-1">
          Sincronizar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map(o => (
          <Box key={o.id} className="flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex justify-between items-start border-b border-sys-border pb-2">
                <div className="truncate pr-2">
                  <div className="font-bold text-sm truncate">{o.serviceName}</div>
                  <div className="text-[10px] text-sys-accent truncate">{o.userEmail}</div>
                </div>
                <div className={`text-[8px] font-bold px-2 py-1 uppercase ${o.status === 'PENDING' ? 'bg-[#ff9900] text-sys-bg' : o.status === 'APPROVED' ? 'bg-sys-accent text-sys-bg' : 'bg-red-600 text-sys-bg'}`}>
                  {o.status}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <a href={o.receiptUrl} target="_blank" rel="noreferrer" className="text-[10px] text-sys-muted hover:text-sys-text underline">VER COMPROBANTE</a>
              {o.status === 'PENDING' && (
                <div className="flex gap-2">
                  <Button onClick={() => handleUpdate(o, 'APPROVED')} className="!py-1 !px-2 text-[8px]">Ok</Button>
                  <Button onClick={() => handleUpdate(o, 'REJECTED')} variant="danger" className="!py-1 !px-2 text-[8px]">X</Button>
                </div>
              )}
            </div>
          </Box>
        ))}
      </div>
    </section>
  );
};