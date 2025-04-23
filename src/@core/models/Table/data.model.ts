// Interface representing a data model with dynamic properties
export interface DataModel {
  /** 
   * An index signature allowing any string as a key, with values of any type
   */
  [key: string]: any;
}
