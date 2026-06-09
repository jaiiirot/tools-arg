// Contenedor base para todos los paneles del sistema
export const Box = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`border border-sys-border bg-sys-panel p-5 ${className}`}>
    {children}
  </div>
);