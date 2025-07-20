import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';
import { storage } from '../utils/storage';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USER_STORAGE_KEY = 'portfolio_user';
const TOKEN_STORAGE_KEY = 'portfolio_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in and verify token
    const initializeAuth = async () => {
      const savedUser = storage.get<User>(USER_STORAGE_KEY);
      const savedToken = storage.get<string>(TOKEN_STORAGE_KEY);

      if (savedUser && savedToken) {
        // Verify token with backend
        const response = await authApi.verifyToken(savedToken);
        
        if (response.success && response.data) {
          setUser(response.data.user);
          setToken(savedToken);
        } else {
          // Token is invalid, clear storage
          storage.remove(USER_STORAGE_KEY);
          storage.remove(TOKEN_STORAGE_KEY);
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // For development, fall back to demo credentials if API fails
      const response = await authApi.login(email, password);
      
      if (response.success && response.data) {
        const { user: userData, token: userToken } = response.data;
        setUser(userData);
        setToken(userToken);
        storage.set(USER_STORAGE_KEY, userData);
        storage.set(TOKEN_STORAGE_KEY, userToken);
        return true;
      } else {
        // Fallback to demo credentials for development
        if (email === 'admin@portfolio.com' && password === 'admin123') {
          const demoUser = {
            id: '1',
            email: 'admin@portfolio.com',
            name: 'John Doe',
          };
          const demoToken = 'demo-token-' + Date.now();
          
          setUser(demoUser);
          setToken(demoToken);
          storage.set(USER_STORAGE_KEY, demoUser);
          storage.set(TOKEN_STORAGE_KEY, demoToken);
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback to demo credentials for development
      if (email === 'admin@portfolio.com' && password === 'admin123') {
        const demoUser = {
          id: '1',
          email: 'admin@portfolio.com',
          name: 'John Doe',
        };
        const demoToken = 'demo-token-' + Date.now();
        
        setUser(demoUser);
        setToken(demoToken);
        storage.set(USER_STORAGE_KEY, demoUser);
        storage.set(TOKEN_STORAGE_KEY, demoToken);
        return true;
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token && token !== 'demo-token-' + Date.now()) {
        await authApi.logout(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      storage.remove(USER_STORAGE_KEY);
      storage.remove(TOKEN_STORAGE_KEY);
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};