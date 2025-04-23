// models
import { DataModel } from "./data.model";

// Interface for defining a column in the table
export interface TableColumnModel {
  /** Unique identifier for the column */
  id: string;

  /** The title or name of the column that will be displayed */
  title: string;

  /** Whether the column is sortable, allows sorting functionality if true */
  sortable?: boolean;

  /** Whether the column can be filtered, allows filtering functionality if true */
  filterable?: boolean;

  /** A custom render function for rendering the content of the column */
  render?: any;
}

// Interface for defining the columns of the table
export interface ColumnsModel {
  /** Total number of columns */
  total: number;

  /** Array of TableColumnModel, representing the columns in the table */
  columns: Array<TableColumnModel>;
}

// Main table model interface which contains columns and data
export interface TableModel {
  /** Columns configuration, includes column definitions and related properties */
  columns: ColumnsModel;

  /** 
   * Array of data that will be displayed in the table
   * Each data item should match the column structure defined in the ColumnsModel
   */
  data: Array<DataModel>;
}