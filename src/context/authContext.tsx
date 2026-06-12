'use client';

import { api } from '@/services/api';
import { getFileUrl } from '@/utils/getFileUrl';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

type User = {
  sub: string;
  name: string;
  email?: string;
  avatar?: string;
  companyId: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get('/auth/me');

        const user = response.data.user;

        setUser({
          ...user,
          avatar: user.avatar ? getFileUrl(user.avatar) : undefined,
        });
      } catch {
        setUser(null);
        toast.error('Usuário não autenticado!');
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  // 🔥 BLOQUEIA renderização enquanto valida
  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
