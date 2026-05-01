import React from 'react';
import TmuxLayout from '@/components/templates/TmuxLayout';
import TerminalText from '@/components/atoms/TerminalText';

const Landing: React.FC = () => {
  return (
    <TmuxLayout title="Inicio">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
        <TerminalText className="text-4xl font-bold text-green-400 mb-4">
          > ./iniciar_sistema.sh
        </TerminalText>
        <p className="text-gray-400 max-w-lg mb-8">
          Bienvenido al entorno. Accede a las herramientas de desarrollo, cursos y recursos del sistema.
        </p>
        <div className="flex gap-4">
          <a href="/login" className="px-6 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition-colors">
            [ Iniciar Sesión ]
          </a>
          <a href="/register" className="px-6 py-2 border border-gray-500 text-gray-400 hover:border-green-400 hover:text-green-400 transition-colors">
            [ Registrarse ]
          </a>
        </div>
      </div>
    </TmuxLayout>
  );
};
export default Landing;
