'use client';

import { api } from '@/services/api';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './authContext';

type Email = {
  id: string;
  address: string;
};

type Client = {
  id: string;
  name: string;
  fantasyName?: string;
  type: 'PF' | 'PJ';
  cpfCnpj: string;
  emails: Email[];
  phone?: string;
  stateRegistration?: string;
  observation?: string;
};

type ClientContextType = {
  clients: Client[];
};

const ClientContext = createContext({} as ClientContextType);

export function ClientProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get(`/clients/${user?.companyId}`);
        setClients(response.data.clients);
      } catch {
        setClients([]);
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
    <ClientContext.Provider value={{ clients }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  return useContext(ClientContext);
}
