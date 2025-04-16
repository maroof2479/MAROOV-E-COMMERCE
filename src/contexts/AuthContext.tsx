
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

// Define types
export interface User {
  id: string;
  email: string;
  name?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsAdmin: (email: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check if user exists in localStorage (temporary solution until Supabase is connected)
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Temporary mock authentication (replace with Supabase)
      if (email && password) {
        // Mock user for demo purposes
        const mockUser = {
          id: '1',
          email,
          name: email.split('@')[0],
          isAdmin: false
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast.success('Logged in successfully');
        return true;
      }
      
      toast.error('Invalid credentials');
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Admin login function
  const loginAsAdmin = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Admin credentials validation should happen on the server-side in real app
      const mockAdminUser = {
        id: 'admin-1',
        email,
        name: 'Administrator',
        isAdmin: true
      };
      
      setUser(mockAdminUser);
      localStorage.setItem('user', JSON.stringify(mockAdminUser));
      toast.success('Admin logged in successfully');
      return true;
    } catch (error) {
      console.error('Admin login failed:', error);
      toast.error('Admin login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Temporary mock registration (replace with Supabase)
      if (email && password) {
        // Mock user for demo purposes
        const mockUser = {
          id: Math.floor(Math.random() * 1000).toString(),
          email,
          name,
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast.success('Registered successfully');
        return true;
      }
      
      toast.error('Registration failed');
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: !!user?.isAdmin,
        isLoading,
        login,
        loginAsAdmin,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
