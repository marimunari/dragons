// Interface for defining the props of the Header component
export interface HeaderModel {
  /** Username to be displayed in the header */
  userName?: string | null;

  /** Optional image URL for the user's profile picture */
  userImage?: string | null;

  /** Function to handle the logout action */
  onLogout: () => void;
}