// Interface for defining a single option in the Select component
export interface SelectOptionModel {
  /** Text label to be displayed in the select dropdown */
  label: string;

  /** Value associated with the option */
  value: string;
}

// Interface for defining the props of the Select component
export interface SelectModel {
  /** Select id attribute (used with label or accessibility) */
  id: string;

  /** Select name attribute */
  name: string;

  /** Currently selected value */
  value: string;

  /** Function to handle select value changes */
  onChange: (selectedOption: SelectOptionModel) => void;

  /** List of selectable options */
  options: Array<SelectOptionModel>;

  /** Placeholder text shown as the first option (optional) */
  placeholder?: string;

  /** Optional icon to be displayed inside the select */
  icon?: React.ReactNode;

  /** Whether the select should be disabled */
  disabled?: boolean;

  /** Whether the select is required */
  required?: boolean;
}
