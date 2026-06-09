import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';

export const OrderManager = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {}
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleUpdate = async (id: string, status: string) => {
    await updateDoc(doc(db, 'orders', id), { status });
    fetchOrders();
  };

 // Reemplaza únicamente el return del componente OrderManager actual:

  return (
    <section className="animate-fade-in font-mono w-full">
      <div className="flex justify-between items-end mb-4 md:mb-6 border-b border-sys-border pb-2">
        <div className="truncate pr-2">
          <h2 className="text-base md:text-xl font-bold uppercase tracking-widest text-sys-text truncate">SYS_ORDERS</h2>
          <span className="text-[9px] md:text-[10px] text-[#ff9900] block">Pending Tasks: {orders.filter(o => o.status === 'PENDING').length}</span>
        </div>
        <button onClick={fetchOrders} className="shrink-0 text-[9px] md:text-[10px] text-sys-accent hover:bg-sys-accent hover:text-black border border-sys-accent px-2 py-1 uppercase transition-colors">
          [ SYNC ]
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {orders.map(o => (
          <div key={o.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-3 border border-sys-border bg-black/40 hover:border-sys-accent transition-colors">
            <div className="flex flex-col w-full min-w-0">
              <div className="text-xs md:text-sm font-bold text-sys-text flex items-center gap-2 truncate">
                <span className="text-sys-accent shrink-0">{">"}</span> 
                <span className="truncate">{o.serviceName}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 mt-2 text-[9px] uppercase tracking-widest truncate">
                <span className={`inline-block px-1 w-max ${o.status === 'PENDING' ? 'text-[#ff9900] border border-[#ff9900]' : o.status === 'APPROVED' ? 'text-sys-accent border border-sys-accent' : 'text-[#ff4444] border border-[#ff4444]'}`}>
                  [{o.status}]
                </span>
                <span className="text-sys-muted truncate">USR: {o.userEmail}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto mt-2 md:mt-0 border-t border-sys-border md:border-t-0 pt-2 md:pt-0">
              <a href={o.receiptUrl} target="_blank" rel="noreferrer" className="text-[9px] text-[#00ffff] hover:underline hover:text-white shrink-0">
                [ VIEW_RECEIPT ]
              </a>
              {o.status === 'PENDING' && (
                <div className="flex gap-2 w-full sm:w-auto">
                  <button onClick={() => handleUpdate(o.id, 'APPROVED')} className="flex-1 sm:flex-none text-[9px] md:text-[10px] border border-sys-accent text-sys-accent px-2 py-1 hover:bg-sys-accent hover:text-black text-center">
                    [ ACCEPT ]
                  </button>
                  <button onClick={() => handleUpdate(o.id, 'REJECTED')} className="flex-1 sm:flex-none text-[9px] md:text-[10px] border border-[#FF4444] text-[#FF4444] px-2 py-1 hover:bg-[#FF4444] hover:text-white text-center">
                    [ DENY ]
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );}