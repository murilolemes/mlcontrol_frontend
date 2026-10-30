'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { AnamneseFormData } from '@/features/anamnese/schemas/anamnese-schema';
import {
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

interface AnamnesePhysicalInfoProps {
  register: UseFormRegister<AnamneseFormData>;
  errors: FieldErrors<AnamneseFormData>;
}

export function AnamnesePhysicalInfo({
  register,
  errors,
}: AnamnesePhysicalInfoProps) {
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex flex-1 flex-col gap-0.5">
          <Label
            htmlFor="pain"
            className="text-foreground/60"
          >
            Dor
          </Label>

          <Textarea
            id="pain"
            placeholder="Digite o local da dor"
            {...register('pain')}
          />
        </div>

        <div className="flex flex-1 flex-col gap-0.5">
          <Label
            htmlFor="surgery"
            className="text-foreground/60"
          >
            Cirurgia
          </Label>

          <Textarea
            id="surgery"
            placeholder="Digite a cirurgia"
            {...register('surgery')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex flex-1 flex-col gap-0.5">
          <Label
            htmlFor="medicines"
            className="text-foreground/60"
          >
            Medicamentos
          </Label>

          <Textarea
            id="medicines"
            placeholder="Digite os medicamentos"
            {...register('medicines')}
          />
        </div>

        <div className="flex flex-1 flex-col gap-0.5">
          <Label
            htmlFor="physicalActivity"
            className="text-foreground/60"
          >
            Atividade Física
          </Label>

          <Textarea
            id="physicalActivity"
            placeholder="Digite a atividade física"
            {...register('physicalActivity')}
          />

          {errors.physicalActivity && (
            <small className="text-sm text-red-400">
              {errors.physicalActivity.message}
            </small>
          )}
        </div>
      </div>
    </>
  );
}