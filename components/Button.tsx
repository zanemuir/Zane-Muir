import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    // Neon yellow background, black text
    primary: "bg-[#ccff00] text-black hover:bg-[#b3e600] shadow-[0_4px_14px_rgba(204,255,0,0.5)] border border-transparent",
    // White background, neon border
    secondary: "bg-white text-black border-2 border-[#ccff00] hover:bg-gray-50",
    // Ghost
    ghost: "bg-transparent text-gray-500 hover:text-black hover:bg-gray-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Thinking...
        </span>
      ) : children}
    </button>
  );
};
