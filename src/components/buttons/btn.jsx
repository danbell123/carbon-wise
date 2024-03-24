import React from 'react';

const Button = ({ children, onClick, size = 'medium', width = 'auto', colour='primary-colour'}) => {
  // Define size classes for the button
  const sizeClasses = {
    small: 'text-xs py-1 px-2',
    medium: 'text-sm py-2 px-4',
    large: 'text-lg py-3 px-6',
  };

  // Choose appropriate size class based on the size prop
  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  // Set the width of the button based on the width prop
  const widthClass = width === 'full' ? 'w-full' : width === 'auto' ? 'w-auto' : `w-${width}`;

  return (
    <button
      onClick={onClick}
      className={`bg-${colour} hover:bg-secondary-colour text-white font-bold rounded-full shadow-lg flex items-center justify-center ${sizeClass} ${widthClass}`}
      style={{ transition: 'background-color 0.3s' }}
    >
      {children}
    </button>
  );
};

export default Button;
