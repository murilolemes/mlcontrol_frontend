'use client';

import {
  addMonths,
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isValid,
  parseISO,
} from 'date-fns';

import { useEffect } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';

import { ClientFormSchema } from '@/features/clients/schemas/client-schema';

type UseClientAgeProps = {
  control: Control<ClientFormSchema>;
  setValue: UseFormSetValue<ClientFormSchema>;
};

export function useClientAge({
  control,
  setValue,
}: UseClientAgeProps) {
  const birthDateValue = useWatch({
    control,
    name: 'birthDate',
  });

  useEffect(() => {
    if (!birthDateValue) {
      setValue('age', '');
      return;
    }

    const birthDate = parseISO(birthDateValue);

    if (!isValid(birthDate)) {
      setValue('age', '');
      return;
    }

    const today = new Date();

    const years = differenceInYears(today, birthDate);

    const dateAfterYears = addYears(birthDate, years);

    const months = differenceInMonths(today, dateAfterYears);

    const dateAfterMonths = addMonths(dateAfterYears, months);

    const days = differenceInDays(today, dateAfterMonths);

    setValue(
      'age',
      `${years} anos, ${months} meses e ${days} dias`,
    );
  }, [birthDateValue, setValue]);
}