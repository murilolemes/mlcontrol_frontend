'use client';

import { ClientFormSchema } from "../schemas/client-schema";


export async function createClient(data: ClientFormSchema) {
    try {
      console.log(data);
      // const emails = data.emails
      //   .map((item) => item.address.trim().toLowerCase())
      //   .filter(Boolean);

      // const phones = data.phones
      //   .map((item) => item.number?.trim() || '')
      //   .filter(Boolean);

      // await createClient({
      //   name: data.name.trim(),
      //   fantasyName: data.fantasyName?.trim() || undefined,
      //   type: data.type,
      //   cpfCnpj: data.cpfCnpj ? data.cpfCnpj.replace(/\D/g, '') : undefined,
      //   email: emails[0],
      //   emails,
      //   phone: phones[0],
      //   phones,
      //   stateRegistration:
      //     data.type === 'PJ'
      //       ? data.stateRegistration?.trim() || undefined
      //       : undefined,
      //   observation: data.observation?.trim() || undefined,
      // });

      // handleResetForm();
    } catch { }
  }
