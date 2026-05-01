import React from 'react';
import TmuxLayout from '@/components/templates/TmuxLayout';
import TerminalText from '@/components/atoms/TerminalText';

const NotFound: React.FC = () => {
  return (
    <TmuxLayout title="Error 404">
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <TerminalText className="text-6xl font-bold text-yellow-500 mb-4">
          404
        </TerminalText>
        <p className="text-yellow-400 font-mono text-xl mb-2">
          bash: route: command not found
        </p>
        <p className="text-gray-500 max-w-md">
          El endpoint solicitado no existe en el índice del sistema. Verifica la sintaxis del path.
        </p>
        <a href="/" className="mt-8 px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black">
          cd /home
        </a>
      </div>
    </TmuxLayout>
  );
};
export default NotFound;
