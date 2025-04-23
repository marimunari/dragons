// Interface representing a Dragon object
export interface DragonModel {
  /** The unique identifier of the dragon */
  id: string;

  /** The name of the dragon */
  name: string;

  /** The type of the dragon (e.g., fire, water, etc.) */
  type: string;

  /** A list of histories associated with the dragon */
  histories: Array<string>;

  /** The creation date of the dragon, in ISO format */
  createdAt: string;
}

// Interface for creating a new Dragon
export interface PostDragonModel {
  /** The name of the new dragon */
  name: string;

  /** The type of the new dragon (e.g., fire, water, etc.) */
  type: string;

  /** A list of histories to associate with the new dragon */
  histories: Array<string>;
}

// Interface for updating an existing Dragon
export interface PutDragonModel {
  /** The updated name of the dragon (optional) */
  name?: string;

  /** The updated type of the dragon (optional) */
  type?: string;

  /** The updated list of histories associated with the dragon (optional) */
  histories?: Array<string>;
}