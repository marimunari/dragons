// Interface for defining the props of the User component
export interface UserModel {
  /** Username to be displayed */
  userName?: string | null;

  /** Optional image URL for the user's profile picture */
  userImage?: string  | null;

  /** Optional function to handle logout action */
  onLogout?: () => void;
}
