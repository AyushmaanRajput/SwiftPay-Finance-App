import React, { useState } from "react";
import {Toast} from "./Toast"; 

export function useCustomToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message) => {
    const newToast = {
      id: new Date().getTime(),
      type,
      message,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const closeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const ToastContainer = () => (
    <div>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => closeToast(toast.id)}
        />
      ))}
    </div>
  );

  return {
    showToast,
    ToastContainer,
  };
}