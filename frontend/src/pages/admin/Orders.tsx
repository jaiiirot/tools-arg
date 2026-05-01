import React from 'react';
import { TmuxLayout } from '../../components/templates/TmuxLayout';
import { Spinner } from '../../components/atoms/Spinner';
import { TerminalText } from '../../components/atoms/TerminalText';
import { Badge } from '../../components/atoms/Badge';
import { useMyOrders } from '../../features/orders/queries/useOrders';

export const Orders: React.FC = () => {
  const { data: orders, isLoading, isError } = useMyOrders();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'COMPLETED': return 'bg-green-500/20 text-green-400';
      case 'PENDING': return 'bg-yellow-500/20 text-yellow-400';
      case 'CANCELLED': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <TmuxLayout title="Mis Órdenes">
      <div className="flex flex-col p-6">
        <header className="mb-6 border-b border-green-500/30 pb-4">
          <div className="text-2xl font-bold text-green-400">
            {`> tail -f /var/log/orders.log`}
          </div>
        </header>

        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <p className="text-red-500">{`[ERROR] Connection refused.`}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-green-900/20 border-b border-green-500/30 text-green-400 font-mono">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">FECHA</th>
                  <th className="px-4 py-3">TOTAL</th>
                  <th className="px-4 py-3">ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order: any) => (
                  <tr key={order.id} className="border-b border-green-500/10 hover:bg-green-500/5 transition-colors">
                    <td className="px-4 py-4 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                    <td className="px-4 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4">${order.total}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </TmuxLayout>
  );
};

export default Orders;