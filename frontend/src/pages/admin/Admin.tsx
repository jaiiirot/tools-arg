import React from 'react';
import TmuxLayout from '@/components/templates/TmuxLayout';
import TerminalText from '@/components/atoms/TerminalText';

const Admin: React.FC = () => {
  return (
    <TmuxLayout title="Admin Root">
      <div className="p-6">
        <TerminalText className="text-2xl font-bold text-green-400 mb-6">
          > sudo su -
        </TerminalText>
        <p className="text-red-400 font-mono mb-4">
          WARNING: You are operating as root. System modifications are permanent.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-green-500/50 text-green-400 hover:bg-green-500/20 text-left font-mono">
            [1] systemctl restart frontend
          </button>
          <button className="p-4 border border-green-500/50 text-green-400 hover:bg-green-500/20 text-left font-mono">
            [2] tail -f /var/log/syslog
          </button>
          <button className="p-4 border border-green-500/50 text-green-400 hover:bg-green-500/20 text-left font-mono">
            [3] userdel -r *
          </button>
        </div>
      </div>
    </TmuxLayout>
  );
};
export default Admin;
