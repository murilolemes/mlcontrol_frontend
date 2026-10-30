'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';

import { conditions } from '@/features/anamnese/constants/pathologies';
import type { AnamneseFormData } from '@/features/anamnese/schemas/anamnese-schema';

import {
  Control,
  Controller,
  FieldErrors,
} from 'react-hook-form';

interface AnamnesePathologiesProps {
  control: Control<AnamneseFormData>;
  errors: FieldErrors<AnamneseFormData>;
}

export function AnamnesePathologies({
  control,
  errors,
}: AnamnesePathologiesProps) {
  return (
    <FieldSet>
      <FieldGroup className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {conditions.map((item) => (
          <Field
            key={item.name}
            orientation="horizontal"
            className="hover:w-fit"
          >
            <Controller
              name="pathologies"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id={item.name}
                  checked={field.value.includes(item.name)}
                  onCheckedChange={(checked) => {
                    const currentPathologies =
                      field.value;

                    if (checked === true) {
                      field.onChange([
                        ...currentPathologies,
                        item.name,
                      ]);
                      return;
                    }

                    field.onChange(
                      currentPathologies.filter(
                        (pathology) =>
                          pathology !== item.name,
                      ),
                    );
                  }}
                />
              )}
            />

            <FieldLabel
              htmlFor={item.name}
              className="text-muted-foreground hover:text-foreground font-normal"
            >
              {item.label}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>

      {errors.pathologies && (
        <small className="text-sm text-red-400">
          {errors.pathologies.message}
        </small>
      )}
    </FieldSet>
  );
}