// Interface representing a breadcrumb item
export interface BreadcrumbItemModel {
  /** The text to be displayed in the breadcrumb */
  label: string;

  /** URL or path the breadcrumb points to */
  href?: string;

  /** Icon to be displayed next to the breadcrumb text */
  icon?: React.ReactNode;
}

// Interface representing the model for breadcrumbs
export interface BreadcrumbsModel {
  /** List of breadcrumb items */
  items: Array<BreadcrumbItemModel>;
}
