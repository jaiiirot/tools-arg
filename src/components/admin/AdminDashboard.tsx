import { useState, useEffect } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { useSystemStore } from '../../store/systemStore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Box } from '../ui/Box';
import { Button } from '../ui/Button';

export const AdminDashboard = () => {
  const { activeTab, setActiveTab } = useAdminStore();
  const addLog = useSystemStore(state => state.addLog);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  // Desconectar sesión
  const handleLogout = () => {
    signOut(auth);
    window.location.href = '/';
  };

  // Inyectar Servicio en MongoDB
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
        addLog('[ÉXITO] Registro insertado en MongoDB.');
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

  // Extraer Órdenes de Firestore
  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    addLog('[SISTEMA] Consultando Firestore: Colección "orders"...');
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
      addLog(`[ÉXITO] ${data.length} órdenes recuperadas.`);
    } catch (err) {
      addLog('[ERROR] Fallo al leer matriz de órdenes.');
    } finally {
      setIsLoadingOrders(false);
    }
  };

  // Cambiar Estado de la Orden
  // Cambiar Estado de la Orden y Notificar
  const handleUpdateOrderStatus = async (order: any, newStatus: 'APPROVED' | 'REJECTED') => {
    addLog(`[SISTEMA] Modificando orden ${order.id}...`);
    try {
      // 1. Actualizar DB
      const orderRef = doc(db, 'orders', order.id);
      await updateDoc(orderRef, { status: newStatus });
      
      // 2. Enviar Correo
      addLog(`[SISTEMA] Disparando notificación SMTP a ${order.userEmail}...`);
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: order.userEmail,
          serviceName: order.serviceName,
          status: newStatus
        })
      });

      addLog(`[ÉXITO] Orden marcada como ${newStatus} y usuario notificado.`);
      fetchOrders(); // Recargar la lista
    } catch (error) {
      addLog('[ERROR] No se pudo actualizar el estado.');
    }
  };

  // Efecto para cargar órdenes automáticamente al cambiar a la pestaña 'orders'
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

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
        <Box className="min-h-[60vh] p-4 md:p-8">
          
          {/* VISTA: SERVICIOS */}
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

          {/* VISTA: ÓRDENES */}
          {activeTab === 'orders' && (
            <section className="animate-fade-in">
              <div className="flex justify-between items-center mb-6 border-b border-sys-border pb-4">
                <h2 className="text-lg font-bold uppercase tracking-widest">Cola de Procesamiento</h2>
                <button onClick={fetchOrders} disabled={isLoadingOrders} className="text-[10px] text-sys-muted hover:text-sys-accent uppercase border border-sys-border px-2 py-1">
                  {isLoadingOrders ? 'Sincronizando...' : 'Recargar'}
                </button>
              </div>
              
              {orders.length === 0 && !isLoadingOrders ? (
                <div className="text-sys-muted text-sm border-l-2 border-sys-border pl-3">
                  No hay órdenes en la base de datos.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orders.map((order) => (
                    <Box key={order.id} className="flex flex-col justify-between">
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2 border-b border-sys-border pb-2">
                          <div className="truncate pr-2">
                            <div className="text-[9px] text-sys-muted uppercase tracking-widest">ID: {order.id}</div>
                            <div className="font-bold text-sm text-sys-text truncate">{order.serviceName}</div>
                            <div className="text-xs text-sys-accent truncate">{order.userEmail}</div>
                          </div>
                          <div className={`text-[9px] font-bold px-2 py-1 uppercase tracking-widest ${
                            order.status === 'PENDING' ? 'bg-[#ff9900] text-sys-bg' :
                            order.status === 'APPROVED' ? 'bg-sys-accent text-sys-bg' :
                            'bg-[#FF4444] text-sys-bg'
                          }`}>
                            {order.status}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto">
                        <a 
                          href={order.receiptUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs text-sys-muted hover:text-sys-text underline transition-colors"
                        >
                          {">"} Ver Comprobante
                        </a>
                        
                        {order.status === 'PENDING' && (
                          <div className="flex gap-2 w-full sm:w-auto">
                            <Button onClick={() => handleUpdateOrderStatus(order.id, 'APPROVED')} className="!py-1 !px-2">Aprobar</Button>
                            <Button onClick={() => handleUpdateOrderStatus(order.id, 'REJECTED')} variant="danger" className="!py-1 !px-2">Rechazar</Button>
                          </div>
                        )}
                      </div>
                    </Box>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* VISTA: USUARIOS */}
          {activeTab === 'users' && (
            <section className="animate-fade-in">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-sys-border pb-4">Auditoría de Usuarios</h2>
              <div className="text-sys-muted text-sm border-l-2 border-sys-border pl-3">
                Esperando extracción de base de datos...
              </div>
            </section>
          )}

        </Box>
      </main>
    </div>
  );
};