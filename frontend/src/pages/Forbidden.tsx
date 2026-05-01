import React from 'react';
import TmuxLayout from '@/components/templates/TmuxLayout';
import TerminalText from '@/components/atoms/TerminalText';

const Forbidden: React.FC = () => {
  return (
    <TmuxLayout title="Error 403">
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <TerminalText className="text-6xl font-bold text-red-500 mb-4">
          403
        </TerminalText>
        <p className="text-red-400 font-mono text-xl mb-2">
          [ERROR] Permission denied.
        </p>
        <p className="text-gray-500 max-w-md">
          Tu nivel de privilegios es insuficiente para ejecutar este binario o acceder a este directorio.
        </p>
        <a href="/" className="mt-8 px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black">
          cd /home
        </a>
      </div>
    </TmuxLayout>
  );
};
export default Forbidden;
