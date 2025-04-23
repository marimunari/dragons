// Interface for defining the props of the Collapse component
export interface CollapseModel {
  /** Title displayed in the header of the collapse section */
  title: string;

  /** Content displayed when the collapse is expanded */
  children: React.ReactNode;
}