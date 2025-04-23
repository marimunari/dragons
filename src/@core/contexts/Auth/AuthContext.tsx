// system
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

// models
import { User, AuthContextData, AuthProviderProps } from '@/src/@core/models/Auth/auth.model';

// mocks
import { fixedUser } from '@/src/@core/consts/mocks/Auth/auth.const.mock';

export const AuthContext = createContext<AuthContextData>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === fixedUser.email && password === fixedUser.password) {
          const user: User = { email: fixedUser.email, userName: fixedUser.userName };
          setUser(user);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(user));
          resolve(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};