// Interface for defining the props of the Textarea component
export interface TextareaModel {
  /** The unique id for the textarea element */
  id: string;

  /** The name of the textarea element */
  name: string;

  /** The current value of the textarea */
  value: string;

  /** Function to handle changes to the textarea's value */
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;

  /** Placeholder text shown inside the textarea */
  placeholder?: string;

  /** Whether the textarea is required */
  required?: boolean;

  /** Whether the textarea is disabled */
  disabled?: boolean;
}