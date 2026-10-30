'use client';

import { ClientFormSchema } from "../schemas/client-schema";

export const initialClientFormValues: ClientFormSchema = {
  name: '',
  fantasyName: '',
  type: 'PF',
  cpfCnpj: '',
  stateRegistration: '',
  emails: [{ address: '' }],
  phones: [{ number: '' }],
  observation: '',
  birthDate: '',
  age: '',
  gender: '',
  occupation: '',
  street: '',
  number: '',
  neighborhood: '',
  complement: '',
  cep: '',
  city: '',
  state: '',
  uf: '',
  rg: '',
  ie: '',
};