// Toast.js
import React from 'react';
import { useToast } from '../../contexts/ToastContext'; 

const Toast = () => {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`fixed ${index * 4 + 1}0 right-0 mt-2 mr-4 p-4 rounded shadow-lg transition-all ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} z-50`}
          style={{ top: `${index * 4 + 1}rem` }}
        >
          <div className="text-white text-sm md:text-base">
            {toast.content}
          </div>
        </div>
      ))}
    </>
  );
};

export default Toast;
