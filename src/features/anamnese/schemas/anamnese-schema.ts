'use client';

import { z } from 'zod';

import {
  conditions,
  type PathologyFieldName,
} from '@/features/anamnese/constants/pathologies';

const pathologyNames = conditions.map(
  (item) => item.name,
);

export const anamneseFormSchema = z
  .object({
    patientName: z
      .string()
      .min(
        1,
        'O nome do paciente é obrigatório',
      ),

    emergencyContactName: z.string().optional(),

    emergencyContact: z.string().optional(),

    clinicalDiagnosis: z.string().optional(),

    mainComplaint: z.string().optional(),

    pain: z.string().optional(),

    surgery: z.string().optional(),

    medicines: z.string().optional(),

    physicalActivity: z.string().optional(),

    additionalInfo: z.string().optional(),

    observation: z.string().optional(),

    pathologies: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    const invalidPathology =
      data.pathologies.find(
        (pathology) =>
          !pathologyNames.includes(
            pathology as PathologyFieldName,
          ),
      );

    if (invalidPathology) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['pathologies'],
        message:
          'Existe uma opção inválida entre os itens selecionados.',
      });
    }
  });

export type AnamneseFormData = z.infer<typeof anamneseFormSchema>;