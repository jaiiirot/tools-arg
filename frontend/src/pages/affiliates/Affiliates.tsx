import React from 'react';
import TmuxLayout from '@/components/templates/TmuxLayout';
import TerminalText from '@/components/atoms/TerminalText';

const Affiliates: React.FC = () => {
  return (
    <TmuxLayout title="Afiliados">
      <div className="p-6">
        <TerminalText className="text-2xl font-bold text-green-400 mb-6">
          > ./network_stats.sh --referrals
        </TerminalText>
        <div className="border border-green-500/30 p-6 bg-black/40">
          <p className="text-gray-400 mb-4">Tu enlace de red:</p>
          <div className="flex gap-2">
            <input type="text" readOnly value="https://app.domain.com/ref/USER_123" className="w-full bg-gray-900 border border-green-500/50 p-2 text-green-300 font-mono" />
            <button className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500 hover:bg-green-500 hover:text-black">Copiar</button>
          </div>
          <div className="mt-8 flex justify-between text-sm text-gray-500 border-t border-green-500/20 pt-4">
            <span>Nodos referidos: <span className="text-green-400">0</span></span>
            <span>Comisiones: <span className="text-green-400">$0.00</span></span>
          </div>
        </div>
      </div>
    </TmuxLayout>
  );
};
export default Affiliates;
