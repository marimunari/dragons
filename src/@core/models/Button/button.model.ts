// types
import { ButtonColor, ButtonType, ButtonVariant, ButtonHtmlType } from '@/src/@core/types/Button/button.type';

// Interface for defining the props of the Button component
export interface ButtonModel {
  /** Defines the button variant (style): "icon", "text", or "iconText" */
  variant?: ButtonVariant;

  /** The text to be displayed on the button, if the variant allows it */
  text?: string;

  /** The icon to be displayed on the button */
  icon?: any;

  /** The function to be executed when the button is clicked */
  onClick?: () => void;

  /** Whether the button is disabled */
  disabled?: boolean;

  /** The button color, such as blue, green, etc. */
  color?: ButtonColor;

  /** Defines the visual type of the button: "rounded" for circular button or "default" for standard button */
  type?: ButtonType;

  /** The HTML button type (defines the form behavior: "button", "submit", or "reset") */
  htmlType?: ButtonHtmlType;
}
