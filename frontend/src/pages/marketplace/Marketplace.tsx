import React from 'react';
import TmuxLayout from '@/components/templates/TmuxLayout';
import TerminalText from '@/components/atoms/TerminalText';

const Marketplace: React.FC = () => {
  return (
    <TmuxLayout title="Marketplace">
      <div className="p-6">
        <TerminalText className="text-2xl font-bold text-green-400 mb-6">
          > curl -X GET https://marketplace.local/api/ofertas
        </TerminalText>
        <div className="text-gray-400">
          <p>Conectando al mercado de intercambio...</p>
          <div className="mt-4 border border-green-500/30 p-4 text-center text-green-500/50">
            [ 200 OK - Sin items por el momento ]
          </div>
        </div>
      </div>
    </TmuxLayout>
  );
};
export default Marketplace;
