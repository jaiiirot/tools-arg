#!/bin/bash

# Crear la estructura de directorios
mkdir -p src/pages/auth src/pages/dashboard src/pages/products src/pages/courses src/pages/marketplace src/pages/affiliates src/pages/admin

# 1. Landing
cat << 'EOF' > src/pages/Landing.tsx
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
EOF

# 2. Login
cat << 'EOF' > src/pages/auth/Login.tsx
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
EOF

# 3. Register
cat << 'EOF' > src/pages/auth/Register.tsx
import React from 'react';
import TmuxLayout from '@/components/templates/TmuxLayout';
import TerminalText from '@/components/atoms/TerminalText';

const Register: React.FC = () => {
  return (
    <TmuxLayout title="Nuevo Usuario">
      <div className="max-w-md mx-auto mt-20 p-6 border border-green-500/30 bg-black/50">
        <TerminalText className="text-xl font-bold text-green-400 mb-6">
          > useradd -m nuevo_usuario
        </TerminalText>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <label className="text-green-500 text-xs mb-1">USERNAME:</label>
            <input type="text" className="bg-transparent border border-green-500/50 p-2 text-green-300 focus:outline-none focus:border-green-400 font-mono" />
          </div>
          <div className="flex flex-col">
            <label className="text-green-500 text-xs mb-1">EMAIL:</label>
            <input type="email" className="bg-transparent border border-green-500/50 p-2 text-green-300 focus:outline-none focus:border-green-400 font-mono" />
          </div>
          <div className="flex flex-col">
            <label className="text-green-500 text-xs mb-1">PASSWORD:</label>
            <input type="password" className="bg-transparent border border-green-500/50 p-2 text-green-300 focus:outline-none focus:border-green-400 font-mono" />
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500 hover:bg-green-500 hover:text-black transition-all">
            REGISTRAR
          </button>
        </form>
      </div>
    </TmuxLayout>
  );
};
export default Register;
EOF

# 4. Dashboard
cat << 'EOF' > src/pages/dashboard/Dashboard.tsx
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
EOF

# 5. Products
cat << 'EOF' > src/pages/products/Products.tsx
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
EOF

# 6. Courses
cat << 'EOF' > src/pages/courses/Courses.tsx
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
EOF

# 7. Marketplace
cat << 'EOF' > src/pages/marketplace/Marketplace.tsx
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
EOF

# 8. Affiliates
cat << 'EOF' > src/pages/affiliates/Affiliates.tsx
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
EOF

# 9. Admin
cat << 'EOF' > src/pages/admin/Admin.tsx
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
EOF

# 10. Forbidden
cat << 'EOF' > src/pages/Forbidden.tsx
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
EOF

# 11. NotFound
cat << 'EOF' > src/pages/NotFound.tsx
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
EOF

echo "[OK] Todos los archivos generados con éxito."