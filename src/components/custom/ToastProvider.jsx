// ToastProvider.js
import React, { createContext, useContext, useState } from 'react';
import Toast from './Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastProvider = ({ children }) => {
  const [toastInfo, setToastInfo] = useState(null);

  const showToast = (type, message, duration = 3000) => {
    setToastInfo({ type, message });

    setTimeout(() => {
      setToastInfo(null);
    }, duration);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toastInfo && <Toast type={toastInfo.type} message={toastInfo.message} duration={3000} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
