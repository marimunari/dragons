// Interface for defining the structure of a user in the application
export interface User {
  /** Username */
  userName: string;

  /** User's email address */
  email: string;
}

// Interface defining the data structure provided by the AuthContext
export interface AuthContextData {
  /** The currently logged-in user object, or null if no user is authenticated */
  user: User | null;

  /** Function to handle user login */
  login: (email: string, password: string) => Promise<boolean>;

  /** Function to handle user logout */
  logout: () => void;

  /** Boolean indicating whether a user is currently authenticated */
  isAuthenticated: boolean;
}

// Interface defining the props for the AuthProvider component
export interface AuthProviderProps {
  /** The child components that the AuthProvider will wrap */
  children: React.ReactNode;
}