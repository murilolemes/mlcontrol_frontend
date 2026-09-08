'use client'

import { isAxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import type {
  UseFormSetValue
} from 'react-hook-form';

import {
  formatCepValue,
  formatPhoneValue,
  getBrazilianStateName,
  normalizeBrazilianState,
  parseOpeningDate,
} from '@/features/clients/utils/client-formatters';

import type { ClientFormSchema } from '@/features/clients/schemas/client-schema';
import { consultCnpj } from '@/features/clients/services/consult-cnpj';
import { validateCnpj } from '@/utils/validateCnpj';

type ClientType = 'PF' | 'PJ';

type UseClientCnpjProps = {
  setValue: UseFormSetValue<ClientFormSchema>;
};

export function useClientCnpj({
  setValue
}: UseClientCnpjProps) {
  const [loadingReceitaws, setLoadingReceitaws] = useState(false);
  
  const [clientType, setClientType] =
    useState<ClientType>('PF');

  const applyConsultData = useCallback(
    (data: Awaited<ReturnType<typeof consultCnpj>>) => {
      if (!data) {
        return;
      }

      setValue('name', data.name, {
        shouldDirty: true,
        shouldTouch: true,
      });

      setValue('fantasyName', data.fantasyName, {
        shouldDirty: true,
        shouldTouch: true,
      });

      setValue(
        'emails',
        data.email.length
          ? data.email.map((address) => ({
            address,
          }))
          : [{ address: '' }],
        {
          shouldDirty: true,
          shouldTouch: true,
        },
      );

      setValue(
        'phones',
        data.phone.length
          ? data.phone.map((number) => ({
            number: formatPhoneValue(number),
          }))
          : [{ number: '' }],
        {
          shouldDirty: true,
          shouldTouch: true,
        },
      );

      setValue('cep', formatCepValue(data.cep), {
        shouldDirty: true,
        shouldTouch: true,
      });

      setValue(
        'birthDate',
        parseOpeningDate(data.openingDate),
        {
          shouldDirty: true,
          shouldTouch: true,
        },
      );

      setValue('street', data.street, {
        shouldDirty: true,
        shouldTouch: true,
      });

      setValue('number', data.number, {
        shouldDirty: true,
        shouldTouch: true,
      });

      setValue('neighborhood', data.district, {
        shouldDirty: true,
        shouldTouch: true,
      });

      setValue('complement', data.complement, {
        shouldDirty: true,
        shouldTouch: true,
      });

      setValue('city', data.city, {
        shouldDirty: true,
        shouldTouch: true,
      });

      setValue('state', getBrazilianStateName(data.uf), {
        shouldDirty: true,
        shouldTouch: true,
      });

      setValue(
        'uf',
        normalizeBrazilianState(data.uf),
        {
          shouldDirty: true,
          shouldTouch: true,
        },
      );
    },
    [setValue],
  );

  const handleConsultCnpj = useCallback(
    async (value: string) => {
      const cleanCnpj = value.replace(/\D/g, '');

      if (!validateCnpj(cleanCnpj)) {
        toast.error(
          'Informe um CNPJ válido com 14 dígitos.',
        );

        return;
      }

      try {
        setLoadingReceitaws(true);

        const data = await consultCnpj(cleanCnpj);
        await new Promise((resolve) =>
          setTimeout(resolve, 5000)
        );

        if (!data) {
          toast.error('CNPJ não encontrado.');
          return;
        }

        applyConsultData(data);
      } catch (error) {
        if (isAxiosError(error)) {
          const responseData = error.response?.data as
            | string
            | {
              message?: string | string[];
              error?: string;
            }
            | undefined;
          const message =
            typeof responseData === 'string'
              ? responseData
              : responseData?.message ?? responseData?.error;

          toast.error(
            Array.isArray(message)
              ? message.join(', ')
              : message || 'Não foi possível consultar o CNPJ.',
          );
        } else {
          toast.error('Não foi possível consultar o CNPJ.');
        }
      } finally {
        setLoadingReceitaws(false);
      }
    },
    [applyConsultData],
  );

  return {
    clientType,
    loadingReceitaws,
    setClientType,
    handleConsultCnpj,
  };
}
