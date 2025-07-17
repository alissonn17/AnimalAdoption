/**
 * Enhanced API types for M5-PDA project
 * Defines all data structures for M4 API communication
 */

// Base response interface
export interface APIResponse<T = Record<string, unknown>> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Authentication types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'shelter';
  createdAt: string;
  updatedAt: string;
}

// Animal types (compatible with existing)
export interface Animal {
  id: string;
  name: string;
  species: 'cachorro' | 'gato' | 'coelho' | 'hamster' | 'outro';
  breed: string;
  age: number;
  size: 'pequeno' | 'médio' | 'grande';
  gender: 'macho' | 'fêmea';
  description: string;
  temperament: string[];
  healthStatus: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  isSpecialNeeds: boolean;
  requirements?: string;
  images: string[];
  shelterId: string;
  shelter?: Shelter;
  status: 'available' | 'adopted' | 'reserved';
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnimalData {
  name: string;
  species: 'cachorro' | 'gato' | 'coelho' | 'hamster' | 'outro';
  breed: string;
  age: number;
  size: 'pequeno' | 'médio' | 'grande';
  gender: 'macho' | 'fêmea';
  description: string;
  temperament: string[];
  healthStatus: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  isSpecialNeeds: boolean;
  requirements?: string;
  images?: string[];
  shelterId: string;
}

export interface UpdateAnimalData extends Partial<CreateAnimalData> {
  status?: 'available' | 'adopted' | 'reserved';
}

// Shelter types
export interface Shelter {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  description: string;
  capacity: number;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  operatingHours: string;
  animals?: Animal[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateShelterData {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  description: string;
  capacity: number;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  operatingHours: string;
}

export interface UpdateShelterData extends Partial<CreateShelterData> {
  id: string;
}

// Adoption types
export interface Adoption {
  id: string;
  userId: string;
  animalId: string;
  user?: User;
  animal?: Animal;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  preferredDate?: string;
  approvedAt?: string;
  rejectedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdoptionData {
  animalId: string;
  message?: string;
  preferredDate?: string;
}

export interface UpdateAdoptionData {
  status?: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

// Contact types
export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Query parameters for API endpoints
export interface AnimalQueryParams {
  species?: string;
  size?: string;
  age?: string;
  page?: number;
  limit?: number;
  search?: string;
  shelterId?: string;
  status?: string;
}

export interface ShelterQueryParams {
  city?: string;
  state?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface AdoptionQueryParams {
  userId?: string;
  animalId?: string;
  status?: string;
  page?: number;
  limit?: number;
}

// Error handling types
export interface APIError {
  message: string;
  status: number;
  data: Record<string, unknown> | null;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Common API hooks return type
export interface APIHookResult<T> extends LoadingState {
  data: T | null;
  refetch: () => Promise<void>;
}

// Statistics types (for dashboard/home page)
export interface Statistics {
  totalAnimals: number;
  totalAdoptions: number;
  totalShelters: number;
  totalUsers: number;
  adoptionsThisMonth: number;
  availableAnimals: number;
}
