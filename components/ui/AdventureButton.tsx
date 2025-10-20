import React from 'react';

interface AdventureButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AdventureButton: React.FC<AdventureButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-6 py-3 font-heading font-semibold text-base bg-gradient-to-r from-amber-glow to-sunset-peach text-white rounded-full border-2 border-warm-gold shadow-adventure-press active:shadow-adventure-press-active active:translate-y-1 active:scale-95 hover:from-amber-glow/90 hover:to-sunset-peach/90 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-parchment-light focus:ring-warm-gold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default AdventureButton;