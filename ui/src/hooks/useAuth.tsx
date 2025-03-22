import { createContext, useContext, useState, useEffect } from 'react';
import { getMe, signIn, signOut, signUp } from '../services/auth';
import { User } from '../services/users';

interface AuthContextType {
  user: User | null;
  postSignIn: (email: string, password: string) => Promise<void>;
  postSignUp: (email: string, password: string, username: string) => Promise<void>;
  postSignOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  // Used to check the session status with the server
  const checkAuth = async () => {
    try {
      const user = await getMe();
      setUser(user);
    } catch (error: any) {
      console.error('Failed to check auth status:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  // Used to create a session and store the user data in the context
  const postSignIn = async (email: string, password: string) => {
    const user = await signIn(email, password);
    setUser(user);
  }

  // Used to sign up a new user, create a session, and store the user data in the context
  const postSignUp = async (email: string, password: string, username: string) => {
    const user = await signUp(email, password, username);
    setUser(user);
  }

  // Used to sign out a user and clear the user data from the context
  const postSignOut = async () => {
    await signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, postSignIn, postSignUp, postSignOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to access the auth context from any component
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}