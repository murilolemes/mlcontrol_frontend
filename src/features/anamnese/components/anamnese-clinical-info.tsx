'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { AnamneseFormData } from '@/features/anamnese/schemas/anamnese-schema';
import {
  UseFormRegister,
} from 'react-hook-form';

interface AnamneseClinicalInfoProps {
  register: UseFormRegister<AnamneseFormData>;
}

export function AnamneseClinicalInfo({
  register,
}: AnamneseClinicalInfoProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="flex flex-1 flex-col gap-0.5">
        <Label
          htmlFor="clinicalDiagnosis"
          className="text-foreground/60"
        >
          Diagnóstico Clínico
        </Label>

        <Textarea
          id="clinicalDiagnosis"
          placeholder="Digite o diagnóstico clínico"
          {...register('clinicalDiagnosis')}
        />
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <Label
          htmlFor="mainComplaint"
          className="text-foreground/60"
        >
          Queixa Principal
        </Label>

        <Textarea
          id="mainComplaint"
          placeholder="Digite a queixa principal"
          {...register('mainComplaint')}
        />
      </div>
    </div>
  );
}