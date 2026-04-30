import { Box } from '../ui/Box';
import { UploadForm } from './UploadForm';
import type { ServiceItem } from '../../services/services.service';

export const ServiceCard = ({ id, name, price, time }: ServiceItem) => (
  <Box className="flex flex-col justify-between h-full hover:border-sys-muted transition-colors">
    <div className="mb-6">
      <div className="flex justify-between items-start gap-4 mb-3">
        <h3 className="font-bold text-sm leading-snug text-sys-text">{name}</h3>
        <span className="text-[9px] bg-sys-border text-sys-text px-2 py-1 uppercase tracking-wider">{time}</span>
      </div>
      <div className="text-2xl font-bold text-sys-accent mt-2">{price}</div>
    </div>
    <UploadForm serviceId={id} serviceName={name} />
  </Box>
);