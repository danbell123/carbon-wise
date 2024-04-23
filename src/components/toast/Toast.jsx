import React from 'react';
import { useToast } from '../../contexts/ToastContext';

const Toast = () => {
  const { toasts, removeToast } = useToast();
  
  return (
    <>
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`fixed top-${10 + index * 4}0 right-0 m-4 p-4 rounded shadow-lg transition-all 
                     ${toast.type === 'success' ? 'bg-green text-white' : 'bg-red text-white'}`}
          style={{ zIndex: 9999 }}
        >
          <div className='flex justify-between items-center'>
            <div className="text-md text-colour-primary font-rubik">
              {toast.content}
            </div>
            <button onClick={() => removeToast(toast.id)} className="ml-4 bg-transparent">
              <span className="material-symbols-outlined text-text-colour-secondary bg-transparent">close</span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Toast;
