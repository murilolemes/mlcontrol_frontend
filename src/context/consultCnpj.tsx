'use client';

import { api } from '@/services/api';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { toast } from 'react-toastify';

export type Consult = {
  name: string;
  fantasyName: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  city: string;
  district: string;
  complement: string;
  uf: string;
  situation: string;
};

type ConsultCnpjContextType = {
  consult: Consult | null;
  loadingReceitaws: boolean;
  handleReceitaws: (cnpj: string) => Promise<Consult | null>;
};

const ConsultCnpjContext = createContext({} as ConsultCnpjContextType);

function extractPrimaryPhone(telefone?: string) {
  if (!telefone) {
    return '';
  }

  const [primaryPhone = ''] = telefone.split('/');
  return primaryPhone.replace(/\D/g, '');
}

export function ConsultCnpjProvider({ children }: { children: ReactNode }) {
  const [consult, setConsult] = useState<Consult | null>(null);
  const [loadingReceitaws, setLoadingReceitaws] = useState(false);

  const handleReceitaws = useCallback(async (numberCnpj: string) => {
    try {
      setLoadingReceitaws(true);

      const cnpj = numberCnpj.replace(/\D/g, '');

      const response = await api.get(`/receitaws/${cnpj}`);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      if (response.data?.status && response.data.status !== 'OK') {
        setConsult(null);
        toast.error('CNPJ não encontrado.');
        return null;
      }

      const data = response.data;
      const normalizedData: Consult = {
        name: data.nome ?? '',
        fantasyName: data.fantasia ?? '',
        email: data.email ?? '',
        phone: extractPrimaryPhone(data.telefone),
        cep: data.cep ?? '',
        street: data.logradouro ?? '',
        number: data.numero ?? '',
        city: data.municipio ?? '',
        district: data.bairro ?? '',
        complement: data.complemento ?? '',
        uf: data.uf ?? '',
        situation: data.situacao ?? '',
      };

      setConsult(normalizedData);
      return normalizedData;
    } catch (error) {
      console.error(error);
      toast.error('Erro ao consultar CNPJ');
      return null;
    } finally {
      setLoadingReceitaws(false);
    }
  }, []);

  return (
    <ConsultCnpjContext.Provider
      value={{
        consult,
        loadingReceitaws,
        handleReceitaws,
      }}
    >
      {children}
    </ConsultCnpjContext.Provider>
  );
}

export function useConsult() {
  return useContext(ConsultCnpjContext);
}
