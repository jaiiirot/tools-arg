import React from 'react';
import TmuxLayout from '@/components/templates/TmuxLayout';
import TerminalText from '@/components/atoms/TerminalText';

const Products: React.FC = () => {
  return (
    <TmuxLayout title="Productos">
      <div className="p-6">
        <TerminalText className="text-2xl font-bold text-green-400 mb-6">
          > ls -la /mnt/inventario
        </TerminalText>
        <div className="text-gray-400">
          <p>Obteniendo lista de productos...</p>
          <div className="mt-4 border border-green-500/30 p-4 text-center text-green-500/50">
            [ Vacio ]
          </div>
        </div>
      </div>
    </TmuxLayout>
  );
};
export default Products;
