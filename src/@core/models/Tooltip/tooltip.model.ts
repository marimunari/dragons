// Interface for defining the props of the Tooltip component
export interface TooltipModel {
  /** The text to display inside the tooltip */
  text: string;

  /** The child element that will trigger the tooltip on hover */
  children: React.ReactNode;
}
