'use client';

import { Email } from "./email";

export type ClientType = 'PF' | 'PJ';

export type Client = {
  id: string;
  name: string;
  fantasyName?: string;
  type: 'PF' | 'PJ';
  cpfCnpj?: string;
  emails: Email[];
  phones?: string[];
  phone?: string;
  stateRegistration?: string;
  observation?: string;
};

export type ConsultCnpj = {
  name: string;
  fantasyName: string;
  email: string[];
  phone: string[];
  openingDate: string;
  cep: string;
  street: string;
  number: string;
  city: string;
  district: string;
  complement: string;
  state: string;
  uf: string;
  situation: string;
};