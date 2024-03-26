import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (content, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9); // Generate a unique id for each toast
    setToasts((currentToasts) => [...currentToasts, { id, content, type }]);

    // Optionally, automatically remove toast after 5 seconds
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
