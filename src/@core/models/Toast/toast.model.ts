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