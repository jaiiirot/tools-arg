import React from 'react';
import TmuxLayout from '@/components/templates/TmuxLayout';
import TerminalText from '@/components/atoms/TerminalText';

const Dashboard: React.FC = () => {
  return (
    <TmuxLayout title="Dashboard">
      <div className="p-6">
        <TerminalText className="text-2xl font-bold text-green-400 mb-6">
          > htop --user-metrics
        </TerminalText>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-green-500/30 p-4">
            <h4 className="text-gray-500 text-sm">MEMORIA</h4>
            <p className="text-green-400 font-mono text-xl">1.2 GB / 4.0 GB</p>
          </div>
          <div className="border border-green-500/30 p-4">
            <h4 className="text-gray-500 text-sm">NIVEL</h4>
            <p className="text-green-400 font-mono text-xl">Lvl 12</p>
          </div>
          <div className="border border-green-500/30 p-4">
            <h4 className="text-gray-500 text-sm">CURSOS ACTIVOS</h4>
            <p className="text-green-400 font-mono text-xl">3</p>
          </div>
          <div className="border border-green-500/30 p-4">
            <h4 className="text-gray-500 text-sm">NOTIFICACIONES</h4>
            <p className="text-yellow-400 font-mono text-xl">2 PENDIENTES</p>
          </div>
        </div>
      </div>
    </TmuxLayout>
  );
};
export default Dashboard;
