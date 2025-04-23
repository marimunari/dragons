// models
import { DragonModel } from "../../interfaces/Dragon/dragon.interface";

// Interface for defining the stats of Dragons
export interface DragonStats {
  /** Total number of dragons grouped by their type */
  totalByType: Record<string, number>;

  /** Number of dragons created in the current month */
  createdThisMonth: number;

  /** The most recently created dragon */
  lastCreated: DragonModel | null;
}