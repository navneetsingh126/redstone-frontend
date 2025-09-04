import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { axiosInstance, API_ENDPOINTS } from 'src/utils/axios-instance';
import { getStoredUser, storeUser, clearAuthData } from 'src/utils/auth-utils';

// ----------------------------------------------------------------------

export interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user_data: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize with stored user data for faster initial render
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const isAuthenticated = !!user;

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);

      // Django REST Framework JWT login response
      const response = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials);

      const { access, refresh, user_data } = response.data;

      // Store tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Store user data and set state
      storeUser(user_data);
      setUser(user_data);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear all auth data
    clearAuthData();

    // Clear user state
    setUser(null);

    // Redirect to sign-in
    window.location.href = '/sign-in';
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('access_token');

      if (!token) {
        setUser(null);
        return;
      }

      // Verify token by making a request to get user info
      // You might want to create a /me/ endpoint in your Django backend
      const response = await axiosInstance.get('/users/api/me/');
      setUser(response.data);
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid tokens and user data
      clearAuthData();
      setUser(null);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Listen for storage changes (e.g., logout from another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token' || e.key === 'refresh_token') {
        if (!e.newValue) {
          // Token was removed (logout)
          setUser(null);
        } else if (e.key === 'access_token' && user) {
          // Token was updated, re-verify
          checkAuth();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ----------------------------------------------------------------------

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
