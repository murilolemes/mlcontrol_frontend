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
  cpfCnpj?: string;
  emails: Email[];
  phone?: string;
  stateRegistration?: string;
  observation?: string;
};

type CreateClientPayload = {
  name: string;
  fantasyName?: string;
  type: 'PF' | 'PJ';
  cpfCnpj?: string;
  email?: string;
  phone?: string;
  stateRegistration?: string;
  observation?: string;
};

type ClientContextType = {
  clients: Client[];
  createClient: (client: CreateClientPayload) => Promise<void>;
};

const ClientContext = createContext({} as ClientContextType);
const clientsCache = new Map<string, Client[]>();
const clientsInFlight = new Map<string, Promise<Client[]>>();

export function ClientProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const companyId = user?.companyId;

    if (!companyId) {
      setClients([]);
      setLoading(false);
      return;
    }

    const cachedClients = clientsCache.get(companyId);
    if (cachedClients) {
      setClients(cachedClients);
      setLoading(false);
      return;
    }

    const inFlightRequest = clientsInFlight.get(companyId);

    if (inFlightRequest) {
      inFlightRequest
        .then((responseClients) => {
          setClients(responseClients);
        })
        .catch(() => {
          setClients([]);
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }

    const request = api
      .get(`/clients/${companyId}`)
      .then((response) => {
        const responseClients = response.data.clients ?? [];
        clientsCache.set(companyId, responseClients);
        return responseClients;
      })
      .catch(() => {
        toast.error('Usuário não autenticado!');
        return [];
      })
      .finally(() => {
        clientsInFlight.delete(companyId);
      });

    clientsInFlight.set(companyId, request);

    request
      .then((responseClients) => {
        setClients(responseClients);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.companyId]);

  async function createClient(client: CreateClientPayload) {
    try {
      if (!user?.companyId) {
        toast.error('Empresa não informada.');
        return;
      }

      const response = await api.post('client', {
        ...client,
        companyId: user.companyId,
      });
      const createdClient = response.data?.client;

      if (createdClient) {
        const cachedClients = clientsCache.get(user.companyId) ?? [];
        const nextClient = {
          ...createdClient,
          emails: client.email
            ? [{ id: `${createdClient.id}-email`, address: client.email }]
            : (createdClient.emails ?? []),
        };

        const nextClients = [
          ...cachedClients,
          nextClient,
        ];

        clientsCache.set(user.companyId, nextClients);
        setClients(nextClients);
      }

      toast.success('Cliente cadastrado com sucesso!');
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message || 'Erro ao cadastrar cliente!';
      toast.error(Array.isArray(message) ? message.join(', ') : message);
      throw error;
    }
  }

  // 🔥 BLOQUEIA renderização enquanto valida
  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <ClientContext.Provider value={{ clients, createClient }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  return useContext(ClientContext);
}
