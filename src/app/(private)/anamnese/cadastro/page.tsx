'use client';

import { SearchClient } from '@/components/clients/search';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const conditions = [
  { name: 'hipertensao', label: 'Hipertensão' },
  { name: 'diabetes', label: 'Diabetes' },
  { name: 'rim', label: 'Rim' },
  { name: 'cardiac', label: 'Problemas Cardíacos' },
  { name: 'cifose', label: 'Cifose' },
  { name: 'escolioseC', label: 'Escoliose C' },
  { name: 'escolioseS', label: 'Escoliose S' },
  { name: 'lordose', label: 'Lordose' },
  { name: 'cabeca', label: 'Cabeça' },
  { name: 'postura', label: 'Postura Inclinada' },
  { name: 'ombros', label: 'Ombros' },
  { name: 'anteriorizacao', label: 'Anteriorização' },
  { name: 'quadril', label: 'Quadril' },
  { name: 'anteversao', label: 'Anteversão' },
  { name: 'retroversao', label: 'Retroversão' },
  { name: 'joelho', label: 'Joelhos' },
  { name: 'genovalgo', label: 'Genovalgo' },
  { name: 'genovaro', label: 'Genovaro' },
  { name: 'hiperextensao', label: 'Hiperextensão' },
] as const;

type PathologyFieldName = (typeof conditions)[number]['name'];

const pathologyNames = conditions.map((item) => item.name);

const anamneseFormSchema = z
  .object({
    patientName: z.string().min(1, 'O nome do paciente é obrigatório'),
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
    const invalidPathology = data.pathologies.find(
      (pathology) => !pathologyNames.includes(pathology as PathologyFieldName),
    );

    if (invalidPathology) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['pathologies'],
        message: 'Existe uma opção inválida entre os itens selecionados.',
      });
    }
  });

export type AnamneseFormData = z.infer<typeof anamneseFormSchema>;

const initialFormValues: AnamneseFormData = {
  patientName: '',
  emergencyContactName: '',
  emergencyContact: '',
  clinicalDiagnosis: '',
  mainComplaint: '',
  pain: '',
  surgery: '',
  medicines: '',
  physicalActivity: '',
  additionalInfo: '',
  observation: '',
  pathologies: [],
};

export default function CreateAnamnese() {
  const [client, setClient] = useState({ id: '', name: '' });

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<AnamneseFormData>({
    resolver: zodResolver(anamneseFormSchema),
    defaultValues: initialFormValues,
  });

  useEffect(() => {
    setValue('patientName', client.name, {
      shouldDirty: true,
    });

    clearErrors('patientName');
  }, [client.name, clearErrors, setValue]);

  function handleResetForm() {
    reset(initialFormValues);
    setClient({ id: '', name: '' });
  }

  function onSubmit(_data: AnamneseFormData) {
    console.log('Formulário enviado com sucesso:', _data);
    handleResetForm();
  }

  return (
    <div className={cn('flex h-full w-full flex-col gap-4')}>
      <div className="flex items-start justify-between">
        <h4 className="text-chart-2 font-bold">Cadastro de Anamnese</h4>
        <p className="text-foreground/60 text-xs">
          Data de Cadastro <span className="font-bold">21/05/2026</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleResetForm}
        className={cn(
          'flex w-full flex-col items-center justify-between',
          'no-scrollbar h-full overflow-y-auto p-1',
        )}
      >
        <div className={cn('flex w-full flex-col gap-4')}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="patientName" className="text-foreground/60">
              Nome do Paciente
            </Label>
            <div className="flex gap-2">
              <Input
                id="patientName"
                placeholder="Nome do paciente"
                readOnly
                className="bg-foreground/10"
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

          <div className={cn('flex gap-4')}>
            <div className="flex flex-1 flex-col gap-2">
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

            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="emergencyContact" className="text-foreground/60">
                Contato de Emergência
              </Label>

              <Input
                id="emergencyContact"
                placeholder="Digite o número"
                {...register('emergencyContact')}
              />
            </div>
          </div>

          <div className={cn('flex gap-4')}>
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="clinicalDiagnosis" className="text-foreground/60">
                Diagnóstico Clínico
              </Label>

              <Textarea
                id="clinicalDiagnosis"
                placeholder="Digite o diagnóstico clínico"
                {...register('clinicalDiagnosis')}
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="mainComplaint" className="text-foreground/60">
                Queixa Principal
              </Label>

              <Textarea
                id="mainComplaint"
                placeholder="Digite a queixa principal"
                {...register('mainComplaint')}
              />
            </div>
          </div>

          <div className={cn('flex gap-4')}>
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="pain" className="text-foreground/60">
                Dor
              </Label>

              <Textarea
                id="pain"
                placeholder="Digite o local da dor"
                {...register('pain')}
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="surgery" className="text-foreground/60">
                Cirurgia
              </Label>

              <Textarea
                id="surgery"
                placeholder="Digite a cirurgia"
                {...register('surgery')}
              />
            </div>
          </div>

          <div className={cn('flex gap-4')}>
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="medicines" className="text-foreground/60">
                Medicamentos
              </Label>

              <Textarea
                id="medicines"
                placeholder="Digite os medicamentos"
                {...register('medicines')}
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="physicalActivity" className="text-foreground/60">
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

          <div className={cn('flex gap-4')}>
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="additionalInfo" className="text-foreground/60">
                Informações Adicionais
              </Label>

              <Textarea
                id="additionalInfo"
                placeholder="Digite as informações adicionais"
                {...register('additionalInfo')}
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="observation" className="text-foreground/60">
                Observação
              </Label>

              <Textarea
                id="observation"
                placeholder="Digite uma observação"
                {...register('observation')}
              />
            </div>
          </div>
          <FieldSet>
            <FieldGroup className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {conditions.map((item) => (
                <Field
                  key={item.name}
                  orientation="horizontal"
                  className="w-fit"
                >
                  <Controller
                    name="pathologies"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id={item.name}
                        checked={field.value.includes(item.name)}
                        onCheckedChange={(checked) => {
                          const currentPathologies = field.value;

                          if (checked === true) {
                            field.onChange([...currentPathologies, item.name]);
                            return;
                          }

                          field.onChange(
                            currentPathologies.filter(
                              (pathology) => pathology !== item.name,
                            ),
                          );
                        }}
                      />
                    )}
                  />

                  <FieldLabel htmlFor={item.name} className="font-normal">
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
        </div>

        <div className={cn('flex w-full justify-between')}>
          <Button
            type="reset"
            className={cn(
              'bg-background text-destructive border-destructive mt-2 border-2 font-bold',
              'hover:text-background transition-all duration-200 hover:bg-red-700',
            )}
          >
            Limpar
          </Button>

          <Button
            type="submit"
            className={cn(
              'bg-background mt-2 border-2 border-green-600 font-bold text-green-600',
              'hover:text-background transition-all duration-200 hover:bg-green-600',
            )}
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
