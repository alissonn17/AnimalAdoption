import axios, { AxiosRequestConfig } from 'axios';
import type {
  CreateAnimalData,
  UpdateAnimalData,
  CreateShelterData,
  UpdateShelterData,
  CreateAdoptionData,
  UpdateAdoptionData,
  ContactData,
  APIError,
  AnimalQueryParams,
  ShelterQueryParams,
  AdoptionQueryParams,
  LoginData,
  RegisterData,
  AuthResponse,
  User
} from '../types/enhanced-api-types';

/**
 * Enhanced API integration for M5-PDA project
 * Includes JWT authentication, token management, and comprehensive CRUD operations
 * Connects to the improved M4 project API with authentication and validation
 */

// Extended axios config interface to handle retry logic
interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// API base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Create axios instance with default configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Para suporte a cookies JWT
});

// Token management utilities
export const tokenManager = {
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    }
    return null;
  },
  
  setToken: (token: string, remember: boolean = false): void => {
    if (typeof window !== 'undefined') {
      if (remember) {
        localStorage.setItem('authToken', token);
        sessionStorage.removeItem('authToken');
      } else {
        sessionStorage.setItem('authToken', token);
        localStorage.removeItem('authToken');
      }
    }
  },
  
  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    }
  },
  
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  }
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token && !tokenManager.isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config as ExtendedAxiosRequestConfig;
      
      // Handle 401 Unauthorized (token expired or invalid)
      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Try to refresh token using refresh endpoint
          const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
            withCredentials: true
          });
          
          const newToken = refreshResponse.data.token;
          tokenManager.setToken(newToken, true);
          
          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          tokenManager.removeToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Error handling utilities
export const handleAPIError = (error: unknown): APIError => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'Erro no servidor',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      // Network error
      return {
        message: 'Erro de conexão com o servidor',
        status: 0,
        data: null
      };
    }
  }
  
  // Other error
  return {
    message: error instanceof Error ? error.message : 'Erro desconhecido',
    status: -1,
    data: null
  };
};

// Authentication API endpoints
export const authAPI = {
  // User registration
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.token) {
        tokenManager.setToken(response.data.token, false);
      }
      
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // User login
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.token) {
        tokenManager.setToken(response.data.token, false);
      }
      
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // User logout
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.warn('Logout endpoint failed:', error);
    } finally {
      tokenManager.removeToken();
    }
  },

  // Get current user profile
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Refresh access token
  refreshToken: async (): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/refresh');
      
      if (response.data.token) {
        tokenManager.setToken(response.data.token, true);
      }
      
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Verify if user is authenticated
  isAuthenticated: (): boolean => {
    const token = tokenManager.getToken();
    return token !== null && !tokenManager.isTokenExpired(token);
  }
};

// Animals API endpoints (protected routes)
export const animalsAPI = {
  // Get all animals with optional filtering
  getAll: async (params?: AnimalQueryParams) => {
    try {
      const response = await api.get('/animals', { params });
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get animal by ID
  getById: async (id: string) => {
    try {
      const response = await api.get(`/animals/${id}`);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Create new animal (admin only)
  create: async (animalData: CreateAnimalData) => {
    try {
      const response = await api.post('/animals', animalData);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Update animal (admin only)
  update: async (id: string, animalData: UpdateAnimalData) => {
    try {
      const response = await api.put(`/animals/${id}`, animalData);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Delete animal (admin only)
  delete: async (id: string) => {
    try {
      const response = await api.delete(`/animals/${id}`);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  }
};

// Shelters API endpoints (protected routes)
export const sheltersAPI = {
  // Get all shelters
  getAll: async (params?: ShelterQueryParams) => {
    try {
      const response = await api.get('/shelters', { params });
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get shelter by ID
  getById: async (id: string) => {
    try {
      const response = await api.get(`/shelters/${id}`);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Create new shelter (admin only)
  create: async (shelterData: CreateShelterData) => {
    try {
      const response = await api.post('/shelters', shelterData);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Update shelter (admin only)
  update: async (id: string, shelterData: UpdateShelterData) => {
    try {
      const response = await api.put(`/shelters/${id}`, shelterData);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Delete shelter (admin only)
  delete: async (id: string) => {
    try {
      const response = await api.delete(`/shelters/${id}`);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  }
};

// Adoptions API endpoints (protected routes)
export const adoptionsAPI = {
  // Get all adoptions (user sees only their own, admin sees all)
  getAll: async (params?: AdoptionQueryParams) => {
    try {
      const response = await api.get('/adoptions', { params });
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get adoption by ID
  getById: async (id: string) => {
    try {
      const response = await api.get(`/adoptions/${id}`);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Create new adoption request
  create: async (adoptionData: CreateAdoptionData) => {
    try {
      const response = await api.post('/adoptions', adoptionData);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Update adoption status (admin only)
  update: async (id: string, adoptionData: UpdateAdoptionData) => {
    try {
      const response = await api.put(`/adoptions/${id}`, adoptionData);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Cancel adoption (user can cancel their own)
  cancel: async (id: string) => {
    try {
      const response = await api.delete(`/adoptions/${id}`);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  }
};

// Contact API endpoint (public)
export const contactAPI = {
  // Send contact form
  sendMessage: async (contactData: ContactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  }
};

// Combined export for easy access
export const apiClient = {
  auth: authAPI,
  animals: animalsAPI,
  shelters: sheltersAPI,
  adoptions: adoptionsAPI,
  contact: contactAPI,
  tokenManager,
  handleAPIError
};

export default apiClient;
