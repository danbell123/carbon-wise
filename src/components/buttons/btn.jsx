import React from 'react';

const Button = ({ children, onClick, size = 'medium', width = 'auto', colour='primaryGradient1'}) => {
  // Define size classes for the button
  const sizeClasses = {
    small: 'text-xs py-1 px-2',
    medium: 'text-sm py-2 px-3',
    large: 'text-base py-3 px-6',
  };

  // Choose appropriate size class based on the size prop
  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  // Set the width of the button based on the width prop
  const widthClass = width === 'full' ? 'w-full' : width === 'auto' ? 'w-auto' : `w-${width}`;

  return (
    <button
      onClick={onClick}
      className={`glassEffectNoShadow overflow-hidden cursor-pointer text-text-colour-primary text-lg rounded px-4 py-2 bg-${colour} ${sizeClass} ${widthClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
