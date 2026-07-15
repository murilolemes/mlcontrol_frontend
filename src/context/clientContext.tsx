'use client';

import { api } from '@/services/api';
import { isAxiosError } from 'axios';
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
  phones?: string[];
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
  emails?: string[];
  phone?: string;
  phones?: string[];
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
  const companyId = user?.companyId;

  useEffect(() => {
    if (!companyId) {
      return;
    }

    const cachedClients = clientsCache.get(companyId);
    if (cachedClients) {
      void Promise.resolve().then(() => {
        setClients(cachedClients);
      });
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
      });
  }, [companyId]);

  async function createClient(client: CreateClientPayload) {
    try {
      if (!user?.companyId) {
        toast.error('Empresa não informada.');
        return;
      }

      const normalizedEmails = [
        ...(client.emails ?? []),
        ...(client.email ? [client.email] : []),
      ].filter(Boolean);
      const normalizedPhones = [
        ...(client.phones ?? []),
        ...(client.phone ? [client.phone] : []),
      ].filter(Boolean);

      const response = await api.post('client', {
        ...client,
        email: normalizedEmails[0],
        emails: normalizedEmails,
        phone: normalizedPhones[0],
        phones: normalizedPhones,
        companyId: user.companyId,
      });
      const createdClient = response.data?.client;

      if (createdClient) {
        const cachedClients = clientsCache.get(user.companyId) ?? [];
        const nextClient = {
          ...createdClient,
          emails: createdClient.emails?.length
            ? createdClient.emails
            : normalizedEmails.map((address, index) => ({
                id: `${createdClient.id}-email-${index}`,
                address,
              })),
          phones: createdClient.phones?.length
            ? createdClient.phones
            : normalizedPhones,
          phone: createdClient.phone ?? normalizedPhones[0],
        };

        const nextClients = [
          ...cachedClients,
          nextClient,
        ];

        clientsCache.set(user.companyId, nextClients);
        setClients(nextClients);
      }

      toast.success('Cliente cadastrado com sucesso!');
    } catch (error: unknown) {
      console.log(error);
      const message = isAxiosError(error)
        ? error.response?.data?.message || 'Erro ao cadastrar cliente!'
        : 'Erro ao cadastrar cliente!';
      toast.error(Array.isArray(message) ? message.join(', ') : message);
      throw error;
    }
  }

  return (
    <ClientContext.Provider value={{ clients: companyId ? clients : [], createClient }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  return useContext(ClientContext);
}
