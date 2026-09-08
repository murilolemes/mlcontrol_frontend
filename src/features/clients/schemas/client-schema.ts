'use client';

import { z } from 'zod';

import { validateCnpj } from '@/utils/validateCnpj';
import { validateCpf } from '@/utils/validateCpf';

export const clientFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'O nome é obrigatório e deve conter no mínimo 3 caracteres'),
    fantasyName: z.string().optional(),
    type: z.enum(['PF', 'PJ']),
    cpfCnpj: z.string().optional(),
    stateRegistration: z.string().optional(),
    emails: z.array(
      z.object({
        address: z.string().trim().email('E-mail inválido').or(z.literal('')),
      }),
    ),
    phones: z.array(
      z.object({
        number: z.string().trim().optional(),
      }),
    ),
    observation: z.string().optional(),
    birthDate: z.string().optional(),
    age: z.string().optional(),
    clinicalDiagnosis: z.string().optional(),
    gender: z.string().optional(),
    occupation: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    neighborhood: z.string().optional(),
    complement: z.string().optional(),
    cep: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    uf: z.string().optional(),
    emergencyContact: z.string().optional(),
    emergencyContactName: z.string().optional(),
    rg: z.string().optional(),
    ie: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { type } = data;
    if (!data.cpfCnpj) {
      return;
    }
    const cpfCnpj = data.cpfCnpj.replace(/\D/g, '');

    if (type === 'PF') {
      if (cpfCnpj.length !== 11 || !validateCpf(cpfCnpj)) {
        ctx.addIssue({
          path: ['cpfCnpj'],
          code: 'custom',
          message: 'CPF inválido',
        });
      }
    }

    if (type === 'PJ') {
      if (cpfCnpj.length !== 14 || !validateCnpj(cpfCnpj)) {
        ctx.addIssue({
          path: ['cpfCnpj'],
          code: 'custom',
          message: 'CNPJ inválido',
        });
      }
    }
  });

export type ClientFormSchema = z.infer<typeof clientFormSchema>;