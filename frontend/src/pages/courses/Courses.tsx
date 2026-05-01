import React from 'react';
import TmuxLayout from '@/components/templates/TmuxLayout';
import TerminalText from '@/components/atoms/TerminalText';

const Courses: React.FC = () => {
  return (
    <TmuxLayout title="Cursos">
      <div className="p-6">
        <TerminalText className="text-2xl font-bold text-green-400 mb-6">
          > cat /etc/modules/training.conf
        </TerminalText>
        <div className="text-gray-400">
          <p>Módulos de capacitación disponibles:</p>
          <div className="mt-4 border border-green-500/30 p-4 text-center text-green-500/50">
            [ No hay cursos asignados ]
          </div>
        </div>
      </div>
    </TmuxLayout>
  );
};
export default Courses;
