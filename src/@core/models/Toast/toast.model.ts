// types
import { ToastType } from "@/src/@core/types/Toast/toast.type";

// Interface for defining the props of the Toaster component
export interface ToastModel {
  /** Unique identifier for each toast */
  id: number;

  /** Type of the toast (success, error, or warning) */
  type: ToastType;

  /** Optional title for the toast */
  title?: string;

  /** Optional description for the toast */
  description?: string;
}

// Interface for the context that manages toast state
export interface ToastContextProps {
  /** List of all current toasts */
  toasts: Array<ToastModel>;

  /** Adds a new toast to the list */
  addToast: (toast: Omit<ToastModel, "id">) => void;

  /** Removes a toast by its ID */
  removeToast: (id: number) => void;
}