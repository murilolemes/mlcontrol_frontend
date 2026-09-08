'use client';

import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import type { ClientFormSchema } from '@/features/clients/schemas/client-schema';

import { createClient } from '@/features/clients/services/create-client';

type UseCreateClientProps = {
  onSuccess: () => void;
};

export function useCreateClient({
  onSuccess,
}: UseCreateClientProps) {
  const [loading, setLoading] = useState(false);

  const handleCreateClient = useCallback(
    async (data: ClientFormSchema) => {
      try {
        setLoading(true);

        await createClient(data);

        toast.success(
          'Cliente cadastrado com sucesso!',
        );

        onSuccess();
      } catch (error) {
        console.error(error);

        toast.error(
          'Erro ao cadastrar cliente.',
        );
      } finally {
        setLoading(false);
      }
    },
    [onSuccess],
  );

  return {
    handleCreateClient,
    loading,
  };
}