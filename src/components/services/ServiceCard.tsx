import { Box } from '../ui/Box';
import { UploadForm } from './UploadForm';
import { useSystemStore } from '../../store/systemStore';
import { useAuthStore } from '../../store/authStore';
import type { ServiceItem } from '../../services/services.service';

export const ServiceCard = ({ id, name, price, time }: ServiceItem) => {
  const dolarRate = useSystemStore(state => state.dolarRate);
  const userProfile = (useAuthStore.getState().user as any)?.profile;
  
  // Limpiamos el string del precio (ej. "$25.00" -> 25.00)
  const usdValue = parseFloat(price.replace(/[^0-9.-]+/g, ""));
  
  // Aplicamos el descuento del asociado (ej. 10% -> 0.10)
  const discountMultiplier = userProfile?.discount ? (1 - (userProfile.discount / 100)) : 1;
  const finalUsd = usdValue * discountMultiplier;
  
  // Convertimos a Pesos Argentinos usando USDT
  const arsValue = finalUsd * dolarRate;

  return (
    <Box className="flex flex-col justify-between h-full hover:border-sys-muted transition-colors relative">
      {userProfile?.discount > 0 && (
        <span className="absolute -top-3 -right-3 bg-sys-accent text-sys-bg text-[10px] font-bold px-2 py-1 uppercase">
          -{userProfile.discount}% ASOCIADO
        </span>
      )}
      <div className="mb-6">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="font-bold text-sm leading-snug text-sys-text">{name}</h3>
          <span className="text-[9px] bg-sys-border text-sys-text px-2 py-1 uppercase tracking-wider">{time}</span>
        </div>
        
        {/* ECONOMÍA: El usuario solo ve Pesos Argentinos */}
        <div className="text-xs text-sys-muted line-through">USDT {usdValue.toFixed(2)}</div>
        <div className="text-2xl font-bold text-sys-accent mt-1">
          ARS ${arsValue.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
      <UploadForm serviceId={id} serviceName={name} />
    </Box>
  );
};