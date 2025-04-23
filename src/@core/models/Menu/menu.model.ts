// Interface for defining the structure of a single menu item
export interface MenuItemModel {
  /** Label to be displayed in the menu item */
  label: string;

  /** Optional navigation path (used if the item redirects to a page) */
  href?: string;

  /** Optional icon displayed next to the label or alone when the menu is collapsed */
  icon?: React.ReactNode;

  /** Optional function to handle a direct action (e.g., logout) */
  action?: () => void;
}

// Interface for defining the props of the Menu component
export interface MenuModel {
  /** List of menu items to be displayed */
  items: Array<MenuItemModel>;

  /** Indicates whether the menu is currently open or collapsed */
  isOpen: boolean;

  /** Function to toggle the open/collapsed state of the menu */
  toggleMenu: () => void;

  /** Optional function to handle logout action */
  onLogout?: () => void;
}