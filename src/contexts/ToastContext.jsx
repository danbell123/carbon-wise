// ToastContext.js
import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (content, type = 'error') => {
    const id = new Date().getTime(); 
    const newToast = { id, content, type };
    setToasts([...toasts, newToast]);
    console.log("Toast added");

    // Remove toast after 5 seconds
    setTimeout(() => {
      setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
    </ToastContext.Provider>
  );
};
