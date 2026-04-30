// Botón de acción principal
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
}

export const Button = ({ children, variant = 'primary', ...props }: Props) => {
  const colorClass = variant === 'primary' 
    ? 'border-sys-accent text-sys-accent hover:bg-sys-accent hover:text-sys-bg'
    : 'border-[#FF4444] text-[#FF4444] hover:bg-[#FF4444] hover:text-sys-bg';

  return (
    <button 
      {...props}
      className={`w-full bg-transparent border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${colorClass}`}
    >
      {children}
    </button>
  );
};