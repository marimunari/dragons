// system
import React, { createContext, useContext, useState, ReactNode } from "react";

// models
import { ToastContextProps, ToastModel } from "../../models/Toast/toast.model";

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToaster = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToaster deve estar dentro do ToastProvider");
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastModel[]>([]);

  const addToast = (toast: Omit<ToastModel, "id">) => {
    const id = Date.now();
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
