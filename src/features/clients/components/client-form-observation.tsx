'use client'

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ClientFormSchema } from "../schemas/client-schema";

type ClientFormObservationProps = {
  register: UseFormRegister<ClientFormSchema>;
  errors: FieldErrors<ClientFormSchema>
}

export function ClientFormObservation({
  register,
  errors
}: ClientFormObservationProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <Label htmlFor="observation" className="text-foreground/60">
        Observação
      </Label>

      <Textarea
        id="observation"
        placeholder="Digite uma observação"
        {...register('observation')}
      />

      {errors.observation && (
        <small className="text-sm text-red-400">
          {errors.observation.message}
        </small>
      )}
    </div>
  )
}