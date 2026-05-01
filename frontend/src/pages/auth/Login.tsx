import React from 'react';
import TmuxLayout from '@/components/templates/TmuxLayout';
import TerminalText from '@/components/atoms/TerminalText';

const Login: React.FC = () => {
  return (
    <TmuxLayout title="Autenticación">
      <div className="max-w-md mx-auto mt-20 p-6 border border-green-500/30 bg-black/50">
        <TerminalText className="text-xl font-bold text-green-400 mb-6">
          > login -u root
        </TerminalText>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <label className="text-green-500 text-xs mb-1">USER_ID:</label>
            <input type="email" className="bg-transparent border border-green-500/50 p-2 text-green-300 focus:outline-none focus:border-green-400 font-mono" placeholder="user@domain.com" />
          </div>
          <div className="flex flex-col">
            <label className="text-green-500 text-xs mb-1">PASSWORD:</label>
            <input type="password" className="bg-transparent border border-green-500/50 p-2 text-green-300 focus:outline-none focus:border-green-400 font-mono" placeholder="********" />
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500 hover:bg-green-500 hover:text-black transition-all">
            EJECUTAR
          </button>
        </form>
      </div>
    </TmuxLayout>
  );
};
export default Login;
