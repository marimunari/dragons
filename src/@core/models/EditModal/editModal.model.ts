// Interface for defining the props of the EditModal component
export interface EditModalModel {
  /** Determines if the modal is open or closed */
  isOpen: boolean;

  /** The ID of the dragon being edited */
  dragonId: string;

  /** The current name of the dragon */
  dragonName: string;

  /** The current type of the dragon */
  dragonType: string;

  /** A list of the dragon's histories */
  dragonHistories: string[];

  /** Function to handle closing the modal */
  onClose: () => void;

  /** Function to handle saving the edited dragon data */
  onSave: (updatedDragon: { id: string; name: string; type: string; histories: string[] }) => void;
}
