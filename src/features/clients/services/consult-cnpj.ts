'use client';

import type { ConsultCnpj } from '@/features/clients/types/client';
import { api } from '@/services/api';
import { validateCnpj } from '@/utils/validateCnpj';

function splitDelimitedValues(value?: string) {
  return (value ?? '')
    .split(/[\/,;|\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function extractEmails(value?: string) {
  const matches = value?.match(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
  );

  return [
    ...new Set(
      matches?.map((item) => item.trim()) ?? [],
    ),
  ];
}

function extractPhoneNumbers(value?: string) {
  return splitDelimitedValues(value)
    .map((item) => item.replace(/\D/g, ''))
    .filter((item) => item.length >= 10)
    .map((item) => item.slice(0, 11));
}

export async function consultCnpj(
  numberCnpj: string,
): Promise<ConsultCnpj | null> {
  const cnpj = numberCnpj.replace(/\D/g, '');

  if (!validateCnpj(cnpj)) {
    return null;
  }

  const response = await api.get(`/receitaws/${cnpj}`);

  if (
    response.data?.status &&
    response.data.status !== 'OK'
  ) {
    return null;
  }

  const data = response.data;

  const normalizedData: ConsultCnpj = {
    name: data.nome ?? '',

    fantasyName: data.fantasia ?? '',

    email: extractEmails(data.email),

    phone: extractPhoneNumbers(data.telefone),

    openingDate:
      data.abertura ??
      data.openingDate ??
      '',

    cep: data.cep ?? '',

    street: data.logradouro ?? '',

    number: data.numero ?? '',

    city: data.municipio ?? '',

    district: data.bairro ?? '',

    complement: data.complemento ?? '',

    state: data.uf ?? '',

    uf: data.uf ?? '',

    situation: data.situacao ?? '',
  };

  return normalizedData;
}