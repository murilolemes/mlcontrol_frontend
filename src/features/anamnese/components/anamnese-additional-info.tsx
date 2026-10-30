'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { AnamneseFormData } from '@/features/anamnese/schemas/anamnese-schema';
import {
  UseFormRegister,
} from 'react-hook-form';

interface AnamneseAdditionalInfoProps {
  register: UseFormRegister<AnamneseFormData>;
}

export function AnamneseAdditionalInfo({
  register,
}: AnamneseAdditionalInfoProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="flex flex-1 flex-col gap-0.5">
        <Label
          htmlFor="additionalInfo"
          className="text-foreground/60"
        >
          Informações Adicionais
        </Label>

        <Textarea
          id="additionalInfo"
          placeholder="Digite as informações adicionais"
          {...register('additionalInfo')}
        />
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <Label
          htmlFor="observation"
          className="text-foreground/60"
        >
          Observação
        </Label>

        <Textarea
          id="observation"
          placeholder="Digite uma observação"
          {...register('observation')}
        />
      </div>
    </div>
  );
}