'use client';

import { useCallback, useState } from 'react';

import type {
  UseFormGetValues,
  UseFormReset
} from 'react-hook-form';

import type { ClientFormSchema } from '@/features/clients/schemas/client-schema';

import { ClientType } from '../types/client';

type UseClientTypeProps = {
  reset: UseFormReset<ClientFormSchema>;
  getValues: UseFormGetValues<ClientFormSchema>;
};

export function useClientType({ getValues, reset }: UseClientTypeProps) {
  const [clientType, setClientType] = useState<ClientType>('PF');
  const [cnpj, setCnpj] = useState('');
  const [cep, setCep] = useState('');

  const handleTypeChange = useCallback(
    (nextType: ClientType) => {
      const values = getValues();

      reset({
        ...values,
        type: nextType,
        cpfCnpj: '',
        rg: '',
        occupation: '',
        gender: '',
        birthDate: '',
        age: '',
        fantasyName: '',
        stateRegistration: '',
        ie: '',
        emails: [{ address: '' }],
        phones: [{ number: '' }],
      });

      setClientType(nextType);
      setCnpj('');
      console.log(values)
    },
    [getValues, reset],
  );

  return {
    cnpj,
    setCnpj,
    cep,
    setCep,
    clientType,
    handleTypeChange
  }
}
