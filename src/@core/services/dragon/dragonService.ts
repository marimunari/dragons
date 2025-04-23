// api
import api from '@/src/@core/services/api/api';

// models
import { DragonModel, PostDragonModel, PutDragonModel } from '../../interfaces/Dragon/dragon.interface';

/**
 * Method responsible for fetching all dragons from the API
 * @returns {Promise<DragonModel[]>}
 */
export const getAllDragons = async (): Promise<DragonModel[]> => {
  try {
    const { data } = await api.get<DragonModel[]>('/dragon');
    return data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Method responsible for fetching a dragon by its ID from the API
 * @param {string} id - the ID of the dragon to be fetched
 * @returns {Promise<DragonModel>}
 */
export const getDragonById = async (id: string): Promise<DragonModel> => {
  try {
    const { data } = await api.get<DragonModel>(`/dragon/${id}`);
    return data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Method responsible for creating a new dragon in the API
 * @param {PostDragonModel} dragonData - the data to create the new dragon
 * @returns {Promise<DragonModel>}
 */
export const createDragon = async (dragonData: PostDragonModel): Promise<DragonModel> => {
  try {
    const { data } = await api.post<DragonModel>('/dragon', dragonData);
    return data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Method responsible for updating an existing dragon in the API
 * @param {string} id - the ID of the dragon to be updated
 * @param {PutDragonModel} dragonData - the data to update the dragon with
 * @returns {Promise<DragonModel>}
 */
export const updateDragon = async (id: string, dragonData: PutDragonModel): Promise<DragonModel> => {
  try {
    const { data } = await api.put<DragonModel>(`/dragon/${id}`, dragonData);
    return data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Method responsible for deleting a dragon by its ID from the API
 * @param {string} id - the ID of the dragon to be deleted.
 * @returns {Promise<void>}
 */
export const deleteDragon = async (id: string): Promise<void> => {
  try {
    await api.delete(`/dragon/${id}`);
  } catch (error: any) {
    throw error;
  }
};