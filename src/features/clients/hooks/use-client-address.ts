'use client';

import { useCallback, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { toast } from "react-toastify";

import { ClientFormSchema } from '@/features/clients/schemas/client-schema';
import { consultCep } from "@/features/clients/services/consult-cep";

import { formatCepValue, normalizeBrazilianState } from "../utils/client-formatters";

type UseClientAddress = {
  setValue: UseFormSetValue<ClientFormSchema>;
};

export function useClientAddress(
  { setValue }: UseClientAddress
) {
  const [loadingCep, setLoadingCep] = useState(false);

  const applyConsultData = useCallback(
    (data: Awaited<ReturnType<typeof consultCep>>) => {
      if (data.erro) {
        toast.error('CEP não encontrado.');
        return;
      }

      setValue('street', data.street, {
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue('neighborhood', data.neighborhood, {
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue('city', data.city, {
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue('state', data.state ?? data.uf, {
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue(
        'uf',
        normalizeBrazilianState(data.uf ?? data.state),
        {
          shouldDirty: true,
          shouldTouch: true,
        },
      );
      setValue('cep', formatCepValue(data.cep), {
        shouldDirty: true,
        shouldTouch: true,
      });
    }, [setValue]
  );

  const handleConsultCep = useCallback(
    async (value: string) => {
      const cep = value.replace(/\D/g, '');

      if (cep.length !== 8) {
        toast.error(
          'Informe um CEP válido.'
        );

        return;
      }

      try {
        setLoadingCep(true);

        const data = await consultCep(cep);

        if (!data) {
          toast.error('CEP não encontrado.');
          return;
        }

        applyConsultData(data);

      } catch (error) {
        console.error(error);
        toast.error('Erro ao consultar o CEP.');
      } finally {
        setLoadingCep(false);
      };

    }, [applyConsultData]
  );

  return {
    handleConsultCep,
    loadingCep
  }
}
