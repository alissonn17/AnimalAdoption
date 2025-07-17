"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { apiClient } from "../services/api-integration-enhanced";
import type { User, AuthResponse } from "../types/enhanced-api-types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && apiClient.auth.isAuthenticated();

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (apiClient.auth.isAuthenticated()) {
          const currentUser = await apiClient.auth.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.warn("Failed to load user:", error);
        // Clear invalid token
        apiClient.tokenManager.removeToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await apiClient.auth.login({
        email,
        password,
      });
      setUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await apiClient.auth.register({
        name,
        email,
        password,
        phone,
      });
      setUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiClient.auth.logout();
    } catch (error) {
      console.warn("Logout failed:", error);
    } finally {
      setUser(null);
      // Force redirect to home page
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      if (apiClient.auth.isAuthenticated()) {
        const currentUser = await apiClient.auth.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.warn("Failed to refresh user:", error);
      setUser(null);
      apiClient.tokenManager.removeToken();
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
