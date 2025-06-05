import React, { useEffect, useState, useContext } from 'react';

const baseUrl = 'http://localhost:8080';

type UserType = {
  username:string;
  email:string;
  profilePicture:string;
  userRole:string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated : (isAuthenticated : boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  accessToken: string | null;
  setAccessToken : (token : string | null) => void;
  user : UserType | null;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setIsAuthenticated(true);
      } else {
        setAccessToken(null);
        setIsAuthenticated(false);
        throw new Error('Login failed');
      }
    } catch (error) {
      setAccessToken(null);
      setIsAuthenticated(false);
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password : string) => {
    try {
      const response = await fetch(`${baseUrl}/auth/registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: name, email, password }),
      });

      if (!response.ok) throw new Error('Registration failed');
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setIsAuthenticated(true);
      } else {
        console.warn('Token refresh failed with status:', response.status);
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      setAccessToken(null);
      setIsAuthenticated(false);
      console.error('Refresh error:', error);
      await logout();
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAccessToken(null);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    refreshAccessToken().catch(() => {
      setIsAuthenticated(false);
    });
  
   const interval = setInterval(() => {
      if (isAuthenticated) {
        refreshAccessToken().catch(() => {
          console.warn('Token refresh failed, forcing logout');
        });
      }
    }, 1000 * 60 * 14);

    return () => clearInterval(interval);
  }, [isAuthenticated]);


  const fetchUser = async () => {
    if (!accessToken) return;
    try {
      const res = await fetch(`${baseUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch user");
      const data =  await res.json();
      return data.userData; 
    } catch (err) {
      console.error("User fetch error:", err);
      throw err;
    } 
  };

 useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && accessToken) {
        const userData = await fetchUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    };
    fetchUserData();
  }, [isAuthenticated, accessToken]);



  return (
    <AuthContext.Provider
      value={{ isAuthenticated,setIsAuthenticated, login, register, logout, accessToken,setAccessToken, user}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};