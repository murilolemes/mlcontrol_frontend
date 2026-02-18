"use client";

import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

type User = {
  sub: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch {
        setUser(null);
        toast.error('Usuário não autenticado!')
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