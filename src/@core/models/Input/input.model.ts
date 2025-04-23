/** Interface for defining the props of the Input component */
export interface InputModel {
  /** Label text displayed above the input */
  label?: string;

  /** Placeholder text shown inside the input */
  placeholder?: string;

  /** HTML input type (e.g., text, password, email) */
  type: string;

  /** Input name attribute */
  name: string;

  /** Input id attribute (used with label) */
  id: string;

  /** Optional icon to be displayed inside the input */
  icon?: any;

  /** Whether the input should be disabled */
  disabled?: boolean;

  /** Whether the input is required */
  required?: boolean;

  /** Current value of the input */
  value: string;

  /** Function to handle input value changes */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
