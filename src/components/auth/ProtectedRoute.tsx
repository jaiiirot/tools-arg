import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isInitialized, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Si ya inicializó Firebase y no hay usuario, expulsar a la raíz
    if (isInitialized && !isAuthenticated) {
      window.location.href = '/';
    }
  }, [isInitialized, isAuthenticated]);

  // Pantalla de carga mientras Firebase valida el token en caché
  if (!isInitialized) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[50vh] border border-console-gray bg-[#1a1a19] p-8">
        <div className="text-console-green font-bold text-lg animate-pulse mb-4">
          > ESTABLECIENDO CONEXIÓN SEGURA...
        </div>
        <div className="text-xs text-console-gray">
          Validando claves de encriptación locales. Por favor espere.
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostramos un mensaje de error antes del redirect
  if (!isAuthenticated) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[50vh] border border-red-900 bg-[#1a1a19] p-8">
        <div className="text-red-500 font-bold text-lg mb-4">
          > [FATAL] ACCESO DENEGADO.
        </div>
        <div className="text-xs text-console-gray">
          Fallo en la validación del token. Cerrando conexión...
        </div>
      </div>
    );
  }

  // Si pasa todas las pruebas, renderiza el Dashboard
  return <>{children}</>;
};