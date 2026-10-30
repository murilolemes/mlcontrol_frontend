'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import {
  clientFormSchema,
  ClientFormSchema,
} from '@/features/clients/schemas/client-schema';
import { cn } from '@/lib/utils';

import { ButtonRegister } from '@/components/forms/button-register';
import TriggerSideBar from '@/components/sideBar/trigger-sidebar';
import { Address } from '@/features/clients/components/client-form-address';
import { ClientFormContact } from '@/features/clients/components/client-form-contact';
import { ClientIndentification } from '@/features/clients/components/client-form-identification';
import { ClientFormObservation } from '@/features/clients/components/client-form-observation';
import { ClientFormPersonal } from '@/features/clients/components/client-form-person';
import { initialClientFormValues } from '@/features/clients/constants/client-default-values';
import { useClientAddress } from '@/features/clients/hooks/use-client-address';
import { useClientAge } from '@/features/clients/hooks/use-client-age';
import { useClientCnpj } from '@/features/clients/hooks/use-client-receitaws';
import { useClientType } from '@/features/clients/hooks/use-client-Type';
import { useCreateClient } from '@/features/clients/hooks/use-create-client';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreateClient() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: initialClientFormValues,
  });

  useClientAge({
    control,
    setValue,
  });

  const handleResetForm = useCallback(() => {
    reset(initialClientFormValues);
  }, [reset]);

  const {
    handleCreateClient,
    // loadingCreateClient,
  } = useCreateClient({
    onSuccess: handleResetForm,
  });

  const { handleConsultCnpj, loadingReceitaws } = useClientCnpj({
    setValue,
  });

  const { handleConsultCep, loadingCep } = useClientAddress({
    setValue,
  });

  const { clientType, cnpj, setCnpj, cep, setCep, handleTypeChange } =
    useClientType({
      getValues,
      reset,
    });

  return (
    <div className={cn('flex w-full flex-col gap-4')}>
      {/* TITULO */}
      <TriggerSideBar title="Clientes" subTitle={['Cadastro']} />

      <form
        onSubmit={handleSubmit(handleCreateClient)}
        onReset={() => handleResetForm()}
        className={cn(
          'flex h-full w-full flex-col items-center justify-between gap-4',
        )}
      >
        <div className={cn('flex w-full flex-col gap-2')}>
          {/* IDENTIFICAÇÃO CLIENTE */}
          <ClientIndentification
            control={control}
            errors={errors}
            clientType={clientType}
            cnpj={cnpj}
            loadingReceitaws={loadingReceitaws}
            setCnpj={setCnpj}
            handleTypeChange={handleTypeChange}
            handleConsultCnpj={() => handleConsultCnpj(cnpj)}
          />

          {/* PESSOAL */}
          <ClientFormPersonal
            control={control}
            errors={errors}
            register={register}
            clientType={clientType}
            loadingReceitaws={loadingReceitaws}
          />

          {/* ENDEREÇO */}
          <Address
            control={control}
            errors={errors}
            loadingCep={loadingCep}
            loadingReceitaws={loadingReceitaws}
            register={register}
            setValue={setValue}
            handleConsultCep={() => handleConsultCep(cep)}
            cep={cep}
            setCep={setCep}
          />

          {/* OBSERVAÇÃO */}
          <ClientFormObservation
            errors={errors}
            register={register}
          />

          {/* CONTATOS */}
          <ClientFormContact
            control={control}
            errors={errors}
            loadingReceitaws={loadingReceitaws}
            register={register}
          />
        </div>

        <ButtonRegister />
      </form>
    </div>
  );
}
