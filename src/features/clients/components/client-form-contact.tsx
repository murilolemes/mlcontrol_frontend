'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PlusIcon, Trash2 } from "lucide-react";
import { Control, Controller, FieldErrors, useFieldArray, UseFormRegister } from "react-hook-form";
import { ClientFormSchema } from "../schemas/client-schema";
import { getPhoneMask } from "../utils/client-formatters";
import { MaskedInput } from "./masked-input";

type ClientFormContact = {
  control: Control<ClientFormSchema>;
  errors: FieldErrors<ClientFormSchema>;
  loadingReceitaws: boolean;
  register: UseFormRegister<ClientFormSchema>;
}

export function ClientFormContact({
  control,
  errors,
  loadingReceitaws,
  register
}: ClientFormContact) {

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
    replace: replaceEmails,
  } = useFieldArray({
    control,
    name: 'emails',
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
    replace: replacePhones,
  } = useFieldArray({
    control,
    name: 'phones',
  });

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      {/* E-MAIL */}
      <div className="flex flex-1 flex-col gap-0.5">
        <Label htmlFor="email" className="text-foreground/60">
          E-mail
        </Label>

        <div className="flex flex-col gap-1.5">
          {emailFields.map((field, index) => {
            const emailError = errors.emails?.[index]?.address;
            return (
              <div key={field.id} className="flex flex-col gap-0.5">
                <div className="flex gap-1.5">
                  <Input
                    id={`email-${index}`}
                    placeholder="Digite seu email"
                    disabled={loadingReceitaws}
                    {...register(`emails.${index}.address` as const)}
                  />

                  <Button
                    type="button"
                    onClick={() => appendEmail({ address: '' })}
                    disabled={loadingReceitaws}
                    className={cn(
                      'bg-background text-foreground/50 border-input border',
                    )}
                    aria-label="Adicionar e-mail"
                  >
                    <PlusIcon />
                  </Button>

                  {emailFields.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeEmail(index)}
                      disabled={loadingReceitaws}
                      className={cn(
                        'bg-background text-foreground/50 border-input border',
                      )}
                      aria-label="Remover e-mail"
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
                {emailError ? (
                  <small
                    key={`email-error-${field.id}`}
                    className="text-sm text-red-400"
                  >
                    {emailError.message}
                  </small>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* TELEFONE */}
      <div className="flex flex-1 flex-col gap-0.5">
        <Label htmlFor="phone" className="text-foreground/60">
          Telefone
        </Label>

        <div className="flex flex-col gap-1.5">
          {phoneFields.map((field, index) => {
            const phoneError = errors.phones?.[index]?.number;
            return (
              <div key={field.id} className="flex flex-col gap-0.5">
                <div key={field.id} className="flex gap-1.5">
                  <Controller
                    name={`phones.${index}.number` as const}
                    control={control}
                    render={({ field: phoneField }) => {
                      return (
                        <MaskedInput
                          id={`phone-${index}`}
                          mask={getPhoneMask(phoneField.value || '')}
                          placeholder="Digite seu telefone"
                          value={phoneField.value || ''}
                          onChange={phoneField.onChange}
                          onBlur={phoneField.onBlur}
                          name={phoneField.name}
                          disabled={loadingReceitaws}
                        />
                      );
                    }}
                  />

                  <Button
                    type="button"
                    onClick={() => appendPhone({ number: '' })}
                    disabled={loadingReceitaws}
                    className={cn(
                      'bg-background text-foreground/50 border-input border',
                    )}
                    aria-label="Adicionar telefone"
                  >
                    <PlusIcon />
                  </Button>

                  {phoneFields.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removePhone(index)}
                      disabled={loadingReceitaws}
                      className={cn(
                        'bg-background text-foreground/50 border-input border',
                      )}
                      aria-label="Remover telefone"
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
                {phoneError ? (
                  <small
                    key={`phone-error-${field.id}`}
                    className="text-sm text-red-400"
                  >
                    {phoneError.message}
                  </small>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}