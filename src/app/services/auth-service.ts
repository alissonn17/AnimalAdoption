import axios, { AxiosError } from 'axios';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../types/api-types';

interface ApiErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://animaladoption-api-fdi1.onrender.com/api';

/**
 * Axios instance for authentication
 */
const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Token management utilities
 */
export const tokenManager = {
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },

  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  },

  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  },

  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },

  setUser: (user: User): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  },

  isAuthenticated: (): boolean => {
    return !!tokenManager.getToken();
  }
};

/**
 * Request interceptor to add auth token
 */
authApi.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🔐 Auth Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Auth Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for auth errors
 */
authApi.interceptors.response.use(
  (response) => {
    console.log(`✅ Auth Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn('🚫 Unauthorized - Clearing auth data');
      tokenManager.removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    console.error('❌ Auth Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

/**
 * Authentication service
 */
export const authService = {
  /**
   * User login
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await authApi.post('/auth/login', credentials);
      const authData: AuthResponse = response.data;
      
      // Store token and user data
      tokenManager.setToken(authData.token);
      tokenManager.setUser(authData.user);
      
      console.log('✅ Login successful:', authData.user.email);
      return authData;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Login failed:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha no login. Verifique suas credenciais.');
    }
  },

  /**
   * User registration
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await authApi.post('/auth/register', userData);
      const authData: AuthResponse = response.data;
      
      // Store token and user data
      tokenManager.setToken(authData.token);
      tokenManager.setUser(authData.user);
      
      console.log('✅ Registration successful:', authData.user.email);
      return authData;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Registration failed:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha no registro. Tente novamente.');
    }
  },

  /**
   * User logout
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint if available
      if (tokenManager.isAuthenticated()) {
        await authApi.post('/auth/logout');
      }
    } catch (error) {
      console.warn('⚠️ Logout endpoint failed:', error);
    } finally {
      // Always clear local data
      tokenManager.removeToken();
      console.log('✅ Logout completed');
    }
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    try {
      const response = await authApi.get('/auth/profile');
      const user: User = response.data;
      
      // Update stored user data
      tokenManager.setUser(user);
      
      return user;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to get profile:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao carregar perfil do usuário.');
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await authApi.put('/auth/profile', userData);
      const user: User = response.data;
      
      // Update stored user data
      tokenManager.setUser(user);
      
      console.log('✅ Profile updated successfully');
      return user;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to update profile:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao atualizar perfil.');
    }
  },

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await authApi.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      console.log('✅ Password changed successfully');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to change password:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao alterar senha.');
    }
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    try {
      await authApi.post('/auth/forgot-password', { email });
      console.log('✅ Password reset email sent');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to request password reset:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao solicitar recuperação de senha.');
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await authApi.post('/auth/reset-password', { token, newPassword });
      console.log('✅ Password reset successfully');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to reset password:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao redefinir senha.');
    }
  },

  /**
   * Verify email token
   */
  async verifyEmail(token: string): Promise<void> {
    try {
      await authApi.post('/auth/verify-email', { token });
      console.log('✅ Email verified successfully');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      console.error('❌ Failed to verify email:', axiosError.response?.data?.message || axiosError.message);
      throw new Error(axiosError.response?.data?.message || 'Falha ao verificar email.');
    }
  }
};

// Export the configured axios instance for other services
export { authApi };
export default authService;
