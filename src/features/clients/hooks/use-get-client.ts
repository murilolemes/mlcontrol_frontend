'use client';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import { useAuth } from '@/context/authContext';

import {
  getClients,
} from '@/features/clients/services/get-client';

import type { Client } from '@/features/clients/types/client';

export function useGetClient() {
  const { user } = useAuth();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  const companyId = user?.companyId;

  const loadClients = useCallback(async () => {
    if (!companyId) {
      setClients([]);
      return;
    }

    try {
      setLoading(true);

      const responseClients =
        await getClients(companyId);

      setClients(responseClients);
    } catch (error) {
      console.error(error);

      setClients([]);

      toast.error(
        'Erro ao carregar os clientes.',
      );
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    void loadClients();
  }, [loadClients]);

  return {
    clients,
    loading,
    loadClients,
  };
}