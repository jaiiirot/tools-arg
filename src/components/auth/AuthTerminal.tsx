import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAuthStore } from '../../store/authStore';
import { useSystemStore } from '../../store/systemStore';

export const AuthTerminal = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { setUser, setInitialized } = useAuthStore();
  const addLog = useSystemStore((state) => state.addLog);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitialized(true);
      if (currentUser) {
        addLog('> [AUTH] Token validado. Redirigiendo a entorno seguro...');
        window.location.href = '/dashboard';
      }
    });
    return () => unsubscribe();
  }, [setUser, setInitialized, addLog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    addLog(`> Ejecutando script de ${isLoginMode ? 'autenticación' : 'registro'}...`);

    try {
      // Usamos .trim() para evitar errores 400 por espacios accidentales en el email
      const safeEmail = email.trim(); 

      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, safeEmail, password);
        addLog('> [SUCCESS] Credenciales aceptadas.');
      } else {
        await createUserWithEmailAndPassword(auth, safeEmail, password);
        addLog('> [SUCCESS] Nuevo usuario encriptado y registrado.');
      }
    } catch (error: any) {
      // Traducción de códigos 400 de Firebase a mensajes de sistema CLI
      let systemErrorMsg = error.message;
      
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          systemErrorMsg = "Credenciales inválidas o entidad no registrada.";
          break;
        case 'auth/invalid-email':
          systemErrorMsg = "El formato del identificador (email) es corrupto.";
          break;
        case 'auth/email-already-in-use':
          systemErrorMsg = "Este identificador ya existe en la base de datos.";
          break;
        case 'auth/weak-password':
          systemErrorMsg = "La keyphrase es demasiado débil (mínimo 6 caracteres).";
          break;
        case 'auth/operation-not-allowed':
          systemErrorMsg = "Proveedor Email/Password DESHABILITADO en consola Firebase.";
          break;
      }

      addLog(`> [ERROR_CRÍTICO] ${systemErrorMsg}`);
      console.error("[FIREBASE_DEBUG]:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12 border border-console-gray bg-[#1a1a19] shadow-[0_0_20px_rgba(0,255,0,0.1)]">
      <div className="bg-[#353534] border-b border-console-gray p-2 flex justify-between items-center">
        <span className="text-xs font-bold text-console-white">root@toolsArg: ~/auth</span>
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-console-gray"></span>
          <span className="w-3 h-3 rounded-full bg-console-gray"></span>
          <span className="w-3 h-3 rounded-full bg-console-green animate-pulse"></span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 border-l-2 border-console-green pl-3">
          <h2 className="text-lg font-bold text-console-white">
            ./{isLoginMode ? 'iniciar_sesion.sh' : 'crear_cuenta.sh'}
          </h2>
          <p className="text-xs text-console-gray">
            Requiere protocolo de encriptación nivel 2.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-console-green font-bold">~ IDENTIFICADOR (EMAIL)</label>
            <input 
              type="email" 
              required
              disabled={isProcessing}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-b border-console-gray focus:border-console-green outline-none text-console-white py-1 px-2 font-mono text-sm transition-colors disabled:opacity-50"
              placeholder="usuario@dominio.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-console-green font-bold">~ KEYPHRASE (PASSWORD)</label>
            <input 
              type="password" 
              required
              disabled={isProcessing}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-b border-console-gray focus:border-console-green outline-none text-console-white py-1 px-2 font-mono text-sm transition-colors disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full border border-console-green text-console-green px-4 py-2 hover:bg-console-green hover:text-console-bg transition-all font-bold tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? '[ ENCRIPTANDO... ]' : '[ EJECUTAR ]'}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-console-gray text-center">
          <button 
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            disabled={isProcessing}
            className="text-xs text-console-gray hover:text-console-white transition-colors"
          >
            {isLoginMode 
                ? <>{">"} ¿No tienes acceso? Solicitar credenciales (Registrarse)</> 
                : <>{">"} ¿Ya tienes protocolo de acceso? Iniciar Sesión</>}
          </button>
        </div>
      </div>
    </div>
  );
};