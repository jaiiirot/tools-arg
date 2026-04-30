import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Box } from '../../ui/Box';
import { Button } from '../../ui/Button';

export const UserManager = () => {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleUpdate = async (id: string, data: any) => {
    await updateDoc(doc(db, 'users', id), data);
    fetchUsers();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-sys-border pb-2">Gestión de Usuarios</h2>
      {users.map(u => (
        <div key={u.id} className="border border-sys-border p-4 flex justify-between items-center">
          <div>
            <div className="font-bold text-sm">{u.email}</div>
            <div className="text-[10px] text-sys-accent uppercase">{u.role} | {u.status}</div>
          </div>
          <div className="flex gap-2">
            {u.status === 'PENDING' && <Button onClick={() => handleUpdate(u.id, {status: 'APPROVED'})} className="!py-1 !px-2">Aprobar</Button>}
            {u.role !== 'ROOT' && <Button onClick={() => handleUpdate(u.id, {role: 'ROOT', status: 'APPROVED'})} className="!py-1 !px-2 !border-dashed">Hacer Admin</Button>}
          </div>
        </div>
      ))}
    </div>
  );
};