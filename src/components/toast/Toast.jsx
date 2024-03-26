// Toast.js
import React from 'react';
import { useToast } from '../../contexts/ToastContext'; 

const Toast = () => {
  const { toasts, removeToast } = useToast();
  
  return (
    <>
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`fixed top-${index * 4 + 1}0 right-0 mt-2 mr-4 p-6 rounded shadow-lg transition-all ${toast.type === 'success' ? 'bg-green' : 'bg-red'} z-50`}
          style={{ top: `${index * 4 + 1}rem` }}
        >
          <div className='flex flex-auto'>
            <div className="text-text-colour-primary text-md font-rubik justify-center">
              {toast.content}
            </div>
            <button onClick={() => removeToast(toast.id)} className="pl-4 bg-transparent">
              <span className="material-symbols-outlined text-text-colour-secondary">close</span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Toast;
