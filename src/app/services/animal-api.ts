import axios from 'axios';
import { Animal, AnimalSearchParams } from '../types/animal-types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://animaladoption-api-fdi1.onrender.com/api';

/**
 * Axios instance with default configuration
 * Includes base URL and common headers
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // Reduced timeout to 5 seconds for faster fallback
});

/**
 * Request interceptor for logging and authentication
 */
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling
 */
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

/**
 * Animal service with comprehensive CRUD operations
 * Provides methods for managing animal data with proper error handling
 */
export const animaisService = {
  /**
   * Retrieve all animals from the API
   * @returns Promise<Animal[]> - Array of all animals
   */
  async getAll(): Promise<Animal[]> {
    try {
      const response = await api.get('/animais');
      return response.data;
    } catch (error) {
      console.error('Error fetching all animals:', error);
      throw new Error('Failed to fetch animals');
    }
  },

  /**
   * Retrieve a specific animal by ID
   * @param id - Animal ID
   * @returns Promise<Animal> - Single animal object
   */
  async getById(id: number): Promise<Animal> {
    try {
      const response = await api.get(`/animais/${id}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { status?: number }; code?: string; message?: string };
      console.error(`Error fetching animal ${id}:`, axiosError?.response?.status, axiosError?.message);
      
      // Re-throw with more specific error information
      if (axiosError?.response?.status === 404) {
        throw new Error(`Animal with ID ${id} not found`);
      } else if (axiosError?.response?.status && axiosError.response.status >= 500) {
        throw new Error(`Server error: ${axiosError.response.status}`);
      } else if (axiosError?.code === 'ECONNABORTED' || axiosError?.message?.includes('timeout')) {
        throw new Error('Request timeout - API is taking too long to respond');
      } else if (axiosError?.code === 'NETWORK_ERROR' || !axiosError?.response) {
        throw new Error('Network error - Unable to connect to API');
      } else {
        throw new Error(`Failed to fetch animal with ID ${id}: ${axiosError?.message}`);
      }
    }
  },

  /**
   * Create a new animal
   * @param animal - Animal data without ID and timestamps
   * @returns Promise<Animal> - Created animal with ID
   */
  async create(animal: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Animal> {
    try {
      const response = await api.post('/animais', animal);
      return response.data;
    } catch (error) {
      console.error('Error creating animal:', error);
      throw new Error('Failed to create animal');
    }
  },

  /**
   * Update an existing animal
   * @param id - Animal ID
   * @param animal - Partial animal data to update
   * @returns Promise<Animal> - Updated animal object
   */
  async update(id: number, animal: Partial<Animal>): Promise<Animal> {
    try {
      const response = await api.put(`/animais/${id}`, animal);
      return response.data;
    } catch (error) {
      console.error(`Error updating animal ${id}:`, error);
      throw new Error(`Failed to update animal with ID ${id}`);
    }
  },

  /**
   * Delete an animal
   * @param id - Animal ID to delete
   * @returns Promise<void>
   */
  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/animais/${id}`);
    } catch (error) {
      console.error(`Error deleting animal ${id}:`, error);
      throw new Error(`Failed to delete animal with ID ${id}`);
    }
  },

  /**
   * Search animals with filters
   * @param params - Search parameters object
   * @returns Promise<Animal[]> - Filtered animals array
   */
  async search(params: AnimalSearchParams): Promise<Animal[]> {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const response = await api.get(`/animais?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error searching animals:', error);
      throw new Error('Failed to search animals');
    }
  },

  /**
   * Get animals by species
   * @param especie - Animal species ('cachorro' or 'gato')
   * @returns Promise<Animal[]> - Animals of specified species
   */
  async getByEspecie(especie: string): Promise<Animal[]> {
    return this.search({ especie });
  },

  /**
   * Get animals by size
   * @param porte - Animal size ('pequeno', 'médio', 'grande')
   * @returns Promise<Animal[]> - Animals of specified size
   */
  async getByPorte(porte: string): Promise<Animal[]> {
    return this.search({ porte });
  },

  /**
   * Get animals by status
   * @param status - Animal status ('disponivel', 'adotado', 'reservado')
   * @returns Promise<Animal[]> - Animals with specified status
   */
  async getByStatus(status: string): Promise<Animal[]> {
    return this.search({ status });
  },

  /**
   * Search animals by name or description
   * @param query - Search query string
   * @returns Promise<Animal[]> - Animals matching the search query
   */
  async searchByQuery(query: string): Promise<Animal[]> {
    return this.search({ search: query });
  }
};

export default api;
