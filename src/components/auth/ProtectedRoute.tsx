import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { useAuthStore } from "../../store/authStore";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isInitialized, isAuthenticated, setUser, setInitialized } =
    useAuthStore();

  useEffect(() => {
    // Al entrar a una ruta protegida, interceptamos la caché de Firebase
    // para restaurar la sesión en Zustand (ya que Astro limpia la memoria al cambiar de URL).
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null as any);
        setInitialized(true);
        return;
      }

      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      let profile = userDoc.exists() ? userDoc.data() : {};

      // REGLA DE ORO: El dueño nunca pierde el acceso
      if (currentUser.email === "jhon.jairo.tumiri@gmail.com") {
        profile = { ...profile, role: "ROOT", status: "APPROVED" };
      }

      (currentUser as any).profile = profile;
      setUser(currentUser);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [setUser, setInitialized]);

  useEffect(() => {
    // Si ya inicializó y descubrió que eres un intruso, te expulsa al inicio.
    if (isInitialized && !isAuthenticated) {
      window.location.href = "/";
    }
  }, [isInitialized, isAuthenticated]);

  // Pantalla de carga mientras lee el IndexedDB local de Firebase
  if (!isInitialized) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[50vh] border border-console-gray bg-[#1a1a19] p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <div className="text-console-green font-bold text-lg animate-pulse mb-4">
          {">"} ESTABLECIENDO CONEXIÓN SEGURA...
        </div>
        <div className="text-xs text-console-gray font-mono">
          Validando claves de encriptación locales. Por favor espere.
        </div>
      </div>
    );
  }

  // Si no estás autenticado (pantalla de 1 milisegundo antes de la redirección)
  if (!isAuthenticated ) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[50vh] border border-red-900 bg-[#1a1a19] p-8">
        <div className="text-red-500 font-bold text-lg mb-4">
          {">"} [FATAL] ACCESO DENEGADO.
        </div>
        <div className="text-xs text-console-gray font-mono">
          Fallo en la validación del token. Cerrando conexión...
        </div>
      </div>
    );
  }

  // Si el token es válido, desencripta y muestra el contenido (Dashboard o Admin)
  return <>{children}</>;
};
