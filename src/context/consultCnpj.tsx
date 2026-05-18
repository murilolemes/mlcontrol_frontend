'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type Consult = {
  name: string;
  fantasyName: string;
  email: string;
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
  loading: boolean;
  handleConsult: (cnpj: string) => Promise<void>;
};

const ConsultCnpjContext = createContext({} as ConsultCnpjContextType);

export function ConsultCnpjProvider({ children }: { children: ReactNode }) {
  const [consult, setConsult] = useState<Consult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleConsult(numberCnpj: string) {
    try {
      setLoading(true);

      const cnpj = numberCnpj.replace(/\D/g, '');

      console.log(cnpj);

      // const response = await apiConsultCnpj.get(`/${cnpj}`);

      // console.log(response.data);

      // setConsult(response.data);
    } catch (error) {
      console.error(error);
      // toast.error('Erro ao consultar CNPJ');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConsultCnpjContext.Provider
      value={{
        consult,
        loading,
        handleConsult,
      }}
    >
      {children}
    </ConsultCnpjContext.Provider>
  );
}

export function useConsult() {
  return useContext(ConsultCnpjContext);
}
