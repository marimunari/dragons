// systen
import React, { useEffect } from "react";

// models
import { ToastModel } from "@/src/@core/models/Toast/toast.model";

// contexts
import { useToaster } from "@/src/@core/contexts/Toast/ToastContext";

// external icoms
import { AiOutlineCheckCircle, AiOutlineWarning, AiOutlineCloseCircle, AiOutlineClose } from "react-icons/ai";

// styles
import styles from "./Toast.module.scss";

export default function Toast(props: ToastModel) {
  const { removeToast } = useToaster();
  
  const iconMap = {
    success: <AiOutlineCheckCircle size={24} color="#10b981" />,
    error: <AiOutlineCloseCircle size={24} color="#ef4444" />,
    warning: <AiOutlineWarning size={24} color="#facc15" />,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(props.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [props.id, removeToast]);

  return (
    <div className={`${styles.toast} ${styles[`toast--${props.type}`]}`}>
      <div className={styles.toast__icon}>
        {iconMap[props.type]}
      </div>

      <div className={styles.toast__content}>
        {props.title && (
          <strong className={styles.toast__title}>{props.title}</strong>
        )}
        {props.description && (
          <p className={styles.toast__description}>{props.description}</p>
        )}
      </div>

      <button
        onClick={() => removeToast(props.id)}
        className={styles.toast__close}
      >
        <AiOutlineClose size={20} />
      </button>
    </div>
  );
}