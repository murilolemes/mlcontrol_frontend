'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AnamneseFormData } from '@/features/anamnese/schemas/anamnese-schema';
import {
  UseFormRegister,
} from 'react-hook-form';

interface AnamneseEmergencyContactProps {
  register: UseFormRegister<AnamneseFormData>;
}

export function AnamneseEmergencyContact({
  register,
}: AnamneseEmergencyContactProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="flex flex-1 flex-col gap-0.5">
        <Label
          htmlFor="emergencyContactName"
          className="text-foreground/60"
        >
          Nome do Contato de Emergência
        </Label>

        <Input
          id="emergencyContactName"
          placeholder="Digite o nome do contato de emergência"
          {...register('emergencyContactName')}
        />
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <Label
          htmlFor="emergencyContact"
          className="text-foreground/60"
        >
          Contato de Emergência
        </Label>

        <Input
          id="emergencyContact"
          placeholder="Digite o número"
          {...register('emergencyContact')}
        />
      </div>
    </div>
  );
}