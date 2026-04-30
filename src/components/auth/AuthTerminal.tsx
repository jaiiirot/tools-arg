import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuthStore } from '../../store/authStore';
import { useSystemStore } from '../../store/systemStore';
import { Box } from '../ui/Box';
import { Button } from '../ui/Button';

export const AuthTerminal = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState(''); // NUEVO
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { setUser, setInitialized } = useAuthStore();
  const fetchDolarRate = useSystemStore(state => state.fetchDolarRate);
  const addLog = useSystemStore(state => state.addLog);

  useEffect(() => {
    fetchDolarRate(); // Cargamos el dólar al abrir la web
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Obtenemos el rol y status desde Firestore
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          (currentUser as any).profile = userData; // Inyectamos el perfil
        }
        setUser(currentUser);
        window.location.href = '/dashboard';
      } else {
        setUser(null);
      }
      setInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    addLog(`[SISTEMA] Iniciando handshake...`);

    try {
      const safeEmail = email.trim(); 
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, safeEmail, password);
      } else {
        // Registro de nuevo nodo
        const userCredential = await createUserWithEmailAndPassword(auth, safeEmail, password);
        
        // Creamos su perfil en la base de datos como PENDIENTE
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: safeEmail,
          role: 'CLIENTE', // CLIENTE, ASOCIADO, ROOT
          status: 'PENDING', // PENDING, APPROVED, REJECTED
          inviteCode: inviteCode.trim().toUpperCase(),
          discount: 0, // Descuento base
          createdAt: new Date().toISOString()
        });
        addLog(`[ÉXITO] Nodo registrado. Esperando validación ROOT.`);
      }
    } catch (error: any) {
      addLog(`[ERROR] Conexión rechazada.`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box className="w-full max-w-md mx-auto mt-12 p-8">
      <div className="mb-8 border-b border-sys-border pb-4">
        <h2 className="text-xl font-bold uppercase tracking-widest text-sys-text">
          {isLoginMode ? 'Autenticación' : 'Registro de Nodo'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input 
          type="email" required disabled={isProcessing} placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          className="bg-sys-bg border border-sys-border focus:border-sys-accent outline-none px-3 py-2 text-sm text-sys-text transition-colors w-full placeholder-sys-muted"
        />
        <input 
          type="password" required disabled={isProcessing} placeholder="Contraseña"
          value={password} onChange={(e) => setPassword(e.target.value)}
          className="bg-sys-bg border border-sys-border focus:border-sys-accent outline-none px-3 py-2 text-sm text-sys-text transition-colors w-full placeholder-sys-muted"
        />

        {!isLoginMode && (
          <input 
            type="text" disabled={isProcessing} placeholder="Código de Asociado (Opcional)"
            value={inviteCode} onChange={(e) => setInviteCode(e.target.value)}
            className="bg-sys-bg border border-sys-border focus:border-sys-accent outline-none px-3 py-2 text-sm text-sys-accent uppercase transition-colors w-full placeholder-sys-muted"
          />
        )}

        <div className="pt-2">
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? 'Procesando...' : (isLoginMode ? 'Ingresar' : 'Solicitar Acceso')}
          </Button>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-sys-border text-center">
        <button 
          type="button" onClick={() => setIsLoginMode(!isLoginMode)} disabled={isProcessing}
          className="text-[10px] text-sys-muted hover:text-sys-accent transition-colors uppercase tracking-widest"
        >
          {isLoginMode ? '» Solicitar Nuevo Acceso' : '» Ya tengo credenciales'}
        </button>
      </div>
    </Box>
  );
};