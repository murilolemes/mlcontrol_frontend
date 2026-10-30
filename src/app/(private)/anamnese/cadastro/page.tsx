'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ButtonRegister } from '@/components/forms/button-register';
import TriggerSideBar from '@/components/sideBar/trigger-sidebar';
import { AnamneseAdditionalInfo } from '@/features/anamnese/components/anamnese-additional-info';
import { AnamneseClinicalInfo } from '@/features/anamnese/components/anamnese-clinical-info';
import { AnamneseEmergencyContact } from '@/features/anamnese/components/anamnese-emergency-contact';
import { AnamnesePathologies } from '@/features/anamnese/components/anamnese-pathologies';
import { AnamnesePatient } from '@/features/anamnese/components/anamnese-patient';
import { AnamnesePhysicalInfo } from '@/features/anamnese/components/anamnese-physical-info';
import { initialAnamneseFormValues } from '@/features/anamnese/constants/anamnese-default-values';
import {
  AnamneseFormData,
  anamneseFormSchema,
} from '@/features/anamnese/schemas/anamnese-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreateAnamnese() {
  const [client, setClient] = useState({
    id: '',
    name: '',
  });

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
    defaultValues: initialAnamneseFormValues,
  });

  useEffect(() => {
    setValue('patientName', client.name, {
      shouldDirty: true,
    });

    clearErrors('patientName');
  }, [client.name, clearErrors, setValue]);

  function handleResetForm() {
    reset(initialAnamneseFormValues);
    setClient({ id: '', name: '' });
  }

  function onSubmit(_data: AnamneseFormData) {
    console.log('Formulário enviado com sucesso:', _data);

    handleResetForm();
  }

  return (
    <div className={cn('flex w-full flex-col gap-4')}>
      <TriggerSideBar title="Anamnese" subTitle={['Cadastro']} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleResetForm}
        className={cn(
          'flex h-full w-full flex-col items-center justify-between gap-4',
          'no-scrollbar h-full overflow-y-auto p-1',
        )}
      >
        <div className="flex w-full flex-col gap-2">
          <AnamnesePatient
            client={client}
            setClient={setClient}
            register={register}
            errors={errors}
          />

          <AnamneseEmergencyContact register={register} />

          <AnamneseClinicalInfo register={register} />

          <AnamnesePhysicalInfo register={register} errors={errors} />

          <AnamneseAdditionalInfo register={register} />

          <AnamnesePathologies control={control} errors={errors} />
        </div>

        <ButtonRegister />
      </form>
    </div>
  );
}
