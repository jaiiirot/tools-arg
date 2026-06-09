import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useSystemStore } from '../../../store/systemStore';

export const UserManager = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const addLog = useSystemStore(state => state.addLog);

  const fetchUsers = async () => {
    addLog('[SISTEMA] Sincronizando matriz de nodos...');
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setErrorMsg(null);
    } catch (error: any) {
      setErrorMsg(`Acceso Denegado: ${error.message}`);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleUpdate = async (id: string, data: any) => {
    await updateDoc(doc(db, 'users', id), data);
    fetchUsers();
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in w-full font-mono">
      <div className="flex justify-between items-end mb-4 md:mb-6 border-b border-sys-border pb-2">
        <div className="truncate pr-2">
          <h2 className="text-base md:text-xl font-bold uppercase tracking-widest text-sys-text truncate">USR_REGISTRY</h2>
          <span className="text-[9px] md:text-[10px] text-sys-accent animate-pulse block">Total Nodes: {users.length}</span>
        </div>
        <button onClick={fetchUsers} className="shrink-0 text-[9px] md:text-[10px] text-sys-accent hover:bg-sys-accent hover:text-black border border-sys-accent px-2 py-1 uppercase transition-colors">
          [ RELOAD ]
        </button>
      </div>

      {errorMsg && <div className="text-[#FF4444] border border-[#FF4444] p-2 text-[10px] md:text-xs bg-[#FF4444]/10">[!] EXCEPTION: {errorMsg}</div>}

      <div className="flex flex-col gap-3">
        {users.map(u => (
          <div key={u.id} className="group flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-3 border border-sys-border bg-black/40 hover:border-sys-accent transition-colors">
            <div className="flex flex-col w-full min-w-0">
              <div className="text-xs md:text-sm text-sys-text flex items-center gap-2 truncate">
                <span className="text-sys-muted shrink-0">{">"}</span> 
                <span className="truncate">{u.email}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 text-[9px] uppercase tracking-widest">
                <span className={`${u.status === 'APPROVED' ? 'text-sys-accent' : 'text-[#ff9900]'}`}>
                  ST:{u.status || 'PENDING'}
                </span>
                <span className="text-sys-muted">|</span>
                <span className="text-[#00ffff]">
                  ROL:{u.role || 'CLIENTE'}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap gap-2 w-full md:w-auto mt-1 md:mt-0">
              {u.status !== 'APPROVED' && (
                <button onClick={() => handleUpdate(u.id, {status: 'APPROVED'})} className="flex-1 md:flex-none text-[9px] md:text-[10px] border border-sys-accent text-sys-accent px-2 py-1 hover:bg-sys-accent hover:text-black transition-colors uppercase text-center">
                  [ APPROVE ]
                </button>
              )}
              {u.role !== 'ROOT' && (
                <button onClick={() => handleUpdate(u.id, {role: 'ROOT', status: 'APPROVED'})} className="flex-1 md:flex-none text-[9px] md:text-[10px] border border-[#FF4444] text-[#FF4444] px-2 py-1 hover:bg-[#FF4444] hover:text-white transition-colors uppercase text-center">
                  [ SUDO_SU ]
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}