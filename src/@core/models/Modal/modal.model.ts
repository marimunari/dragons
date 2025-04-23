// Interface for defining the props of the Modal component
export interface ModalModel {
  /** Determines if the modal is open or closed */
  isOpen: boolean;

  /** The title of the modal */
  title: string;

  /** The message displayed in the modal */
  message: string;

  /** Function to handle the closing of the modal */
  onClose: () => void;

  /** Function to handle the confirm action in the modal */
  onConfirm: () => void;

  /** Optional flag to indicate if the confirm button should be in a loading state */
  isLoading?: boolean;
}