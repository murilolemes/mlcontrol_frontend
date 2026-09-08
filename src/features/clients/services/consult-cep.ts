'use client';

import { apiCep } from '@/services/api';

export type ConsultCepResponse = {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  estado?: string;
  uf?: string;
  erro?: boolean;
};

type AddressDto = {
  cep: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  uf?: string;
  erro?: boolean;
}

export async function consultCep(
  cep: string,
): Promise<AddressDto> {
  const { data } = await apiCep.get<ConsultCepResponse>(
    `/${cep}/json`,
  );

  return <AddressDto>{
    cep: data.cep,
    street: data.logradouro,
    neighborhood: data.bairro,
    city: data.localidade,
    state: data.estado,
    uf: data.uf,
    erro: data.erro
  };
}