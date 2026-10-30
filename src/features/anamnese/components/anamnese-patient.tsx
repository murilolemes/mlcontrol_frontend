'use client';

import { SearchClient } from '@/components/clients/search-client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AnamneseFormData } from '@/features/anamnese/schemas/anamnese-schema';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface AnamnesePatientProps {
  client: {
    id: string;
    name: string;
  };
  setClient: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
    }>
  >;
  register: UseFormRegister<AnamneseFormData>;
  errors: FieldErrors<AnamneseFormData>;
}

export function AnamnesePatient({
  client,
  setClient,
  register,
  errors,
}: AnamnesePatientProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <Label
        htmlFor="patientName"
        className="text-foreground/60"
      >
        Nome do Paciente
      </Label>

      <div className="flex flex-col items-center gap-2 md:flex-row">
        <Input
          id="patientName"
          placeholder="Nome do paciente"
          readOnly
          className="bg-input/30"
          {...register('patientName')}
        />

        <SearchClient setClient={setClient} />
      </div>

      {errors.patientName && (
        <small className="text-sm text-red-400">
          {errors.patientName.message}
        </small>
      )}
    </div>
  );
}