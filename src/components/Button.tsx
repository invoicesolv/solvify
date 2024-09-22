import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', className, ...props }) => {
  // Add logic here to apply different styles based on the variant
  return (
    <button 
      className={`${className} ${variant}`} 
      {...props}
    />
  );
};

export default Button;