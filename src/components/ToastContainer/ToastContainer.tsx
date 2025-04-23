// system
import React from "react";

// hooks
import { useToaster } from "@/src/@core/contexts/Toast/ToastContext";

// internal components
import Toast from "@/src/components/Toast/Toast";

// styles
import styles from "./ToastContainer.module.scss";

export default function ToastContainer() {
  const { toasts } = useToaster();

  return (
    <div className={styles["toast-container"]}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}
