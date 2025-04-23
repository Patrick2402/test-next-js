'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

type User = {
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (token: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Lista publicznych ścieżek (dostępnych bez logowania)
const publicPaths = ['/', '/login', '/register', '/about'];
// Lista chronionych ścieżek (dostępnych tylko po zalogowaniu)
const protectedPaths = ['/test'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Sprawdź czy użytkownik jest zalogowany przy pierwszym ładowaniu
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('auth_token');
      
      if (savedToken) {
        try {
          // Ustaw nagłówki autoryzacji
          axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          
          try {
            // Opcjonalnie: Weryfikacja tokenu przez zapytanie do endpointu profile
            const response = await axios.get('http://localhost:8080/api/profile');
            if (response.data && response.data.email) {
              setUser({
                email: response.data.email
              });
              setIsAuthenticated(true);
            }
          } catch (error) {
            // Jeśli token jest nieprawidłowy, wyloguj użytkownika
            performLogout();
          }
        } catch (error) {
          performLogout();
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Sprawdzanie dostępu do bieżącej ścieżki
  useEffect(() => {
    if (!isLoading) {
      // Jeśli użytkownik próbuje dostać się do chronionej strony bez logowania
      if (!isAuthenticated && protectedPaths.some(path => pathname?.startsWith(path))) {
        toast.error('Ta strona wymaga zalogowania');
        router.push('/login');
      }
      
      // Jeśli zalogowany użytkownik próbuje dostać się do stron logowania/rejestracji
      if (isAuthenticated && ['/login', '/register'].includes(pathname || '')) {
        router.push('/');
      }
    }
  }, [pathname, isAuthenticated, isLoading, router]);

  const login = (token: string, email: string) => {
    localStorage.setItem('auth_token', token);
    setUser({ email });
    setIsAuthenticated(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const performLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['Authorization'];
  };

  const logout = () => {
    performLogout();
    router.push('/login');
    toast.success('Wylogowano pomyślnie');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isLoading, 
        user, 
        login, 
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}