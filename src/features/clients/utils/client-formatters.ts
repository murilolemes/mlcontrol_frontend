'use client';

import { format, isValid, parse } from 'date-fns';

import { brazilianStates } from '@/features/clients/constants/brazilian-states';

export function normalizeBrazilianState(value?: string) {
  if (!value) {
    return '';
  }

  const normalizedValue = value.trim().toLowerCase();
  const normalizedCode = value.trim().toUpperCase();

  const matchedByCode = brazilianStates.find(
    (state) => state.value === normalizedCode,
  );

  if (matchedByCode) {
    return matchedByCode.value;
  }

  const matchedByName = brazilianStates.find(
    (state) => state.name.toLowerCase() === normalizedValue,
  );

  return matchedByName?.value ?? '';
}

export function getBrazilianStateName(value?: string) {
  const normalizedCode = normalizeBrazilianState(value);

  return (
    brazilianStates.find((state) => state.value === normalizedCode)?.name ??
    ''
  );
}

export function formatCepValue(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}-${digits.slice(5)}`;
}

export function formatPhoneValue(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function getPhoneMask(value: string) {
  return value.replace(/\D/g, '').length > 10
    ? '(__) _____-____'
    : '(__) ____-____';
}

export function parseOpeningDate(value?: string) {
  if (!value) {
    return '';
  }

  const parsedDate = parse(value, 'dd/MM/yyyy', new Date());

  if (!isValid(parsedDate)) {
    return '';
  }

  return format(parsedDate, 'yyyy-MM-dd');
}