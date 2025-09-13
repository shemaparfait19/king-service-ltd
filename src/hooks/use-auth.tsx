
"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import nookies from 'nookies';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        const token = await user.getIdToken();
        nookies.set(undefined, 'session', token, { path: '/' });
      } else {
        nookies.destroy(undefined, 'session', { path: '/' });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const login = (email: string, pass: string) => {
      return signInWithEmailAndPassword(auth, email, pass);
  }

  const logout = () => {
    return signOut(auth);
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Wrapper for login page to prevent rendering it if already logged in
export function WithoutAuth(Component: React.ComponentType) {
    return function WrappedComponent(props: any) {
        const { user, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && user) {
                router.replace('/admin');
            }
        }, [user, loading, router]);
        
        if (loading || user) {
             return null; // Or a loading spinner
        }

        return <Component {...props} />;
    }
}
