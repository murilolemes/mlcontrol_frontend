'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { validateCnpj } from '@/utils/validateCnpj';
import { validateCpf } from '@/utils/validateCpf';
import { useMask } from '@react-input/mask';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const clientFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'O nome é obrigatório e deve conter no mínimo 3 caracteres'),
    fantasyName: z.string().optional(),
    type: z.enum(['pf', 'pj']),
    cpfCnpj: z.string().min(1, 'CPF/CNPJ obrigatório'),
    stateRegistration: z.string().optional(),
    email: z.string().email('E-mail inválido').or(z.literal('')).optional(),
    phone: z.string().optional(),
    observation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { type } = data;
    const cpfCnpj = data.cpfCnpj.replace(/\D/g, '');

    if (type === 'pf') {
      if (cpfCnpj.length !== 11 || !validateCpf(cpfCnpj)) {
        ctx.addIssue({
          path: ['cpfCnpj'],
          code: 'custom',
          message: 'CPF inválido',
        });
      }
    }

    if (type === 'pj') {
      if (cpfCnpj.length !== 14 || !validateCnpj(cpfCnpj)) {
        ctx.addIssue({
          path: ['cpfCnpj'],
          code: 'custom',
          message: 'CNPJ inválido',
        });
      }
    }
  });

export type ClientFormSchema = z.infer<typeof clientFormSchema>;

export default function CreateClient() {
  const [clientType, setClientType] = useState<'pf' | 'pj'>('pf');
  const [isValidCpfCnpj, setIsValidCpfCnpj] = useState(false);

  const maskCpf = '___.___.___-__';
  const maskCnpj = '__.___.___/____-__';

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      type: clientType,
    },
  });

  async function onSubmit(data: ClientFormSchema) {
    try {
      console.log('cliquei no submit', data);
    } catch (err) {
      toast.error('Erro ao enviar o formulário!');
    }
  }

  return (
    <div className={cn('flex h-full w-full flex-col gap-4')}>
      <h4 className="font-bold text-blue-900">Cadastro de Clientes</h4>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          'flex h-full w-full flex-col items-center justify-between rounded-sm p-4 shadow-[0_0_2px] shadow-gray-400',
        )}
      >
        <div className={cn('flex w-full flex-col gap-3 md:max-w-xl')}>
          <div className={cn('flex w-fit flex-col gap-2')}>
            <Label htmlFor="type">Tipo</Label>

            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <RadioGroup
                  key={field.name}
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex h-full justify-around gap-8"
                >
                  <div className="flex items-center gap-1">
                    <RadioGroupItem
                      value="pf"
                      id="pf"
                      onClick={() => setClientType('pf')}
                    />
                    <Label
                      htmlFor="pf"
                      className="text-sm font-normal text-gray-400"
                    >
                      Pessoa Física
                    </Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <RadioGroupItem
                      value="pj"
                      id="pj"
                      onClick={() => setClientType('pj')}
                    />
                    <Label
                      htmlFor="pj"
                      className="text-sm font-normal text-gray-400"
                    >
                      Pessoa Jurídica
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.type && (
              <small className="text-2sm text-red-400">
                {errors.type.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>

            <Input
              id="name"
              placeholder="Digite seu nome"
              {...register('name')}
            />

            {errors.name && (
              <small className="text-sm text-red-400">
                {errors.name.message}
              </small>
            )}
          </div>

          {clientType === 'pj' && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="fantasyName">Nome Fantasia</Label>

              <Input
                id="fantasyName"
                placeholder="Digite o nome fantasia"
                {...register('fantasyName')}
              />

              {errors.fantasyName && (
                <small className="text-sm text-red-400">
                  {errors.fantasyName.message}
                </small>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="cpfCnpj">
              {clientType === 'pf' ? 'CPF' : 'CNPJ'}
            </Label>

            <div className={cn('flex flex-row items-center gap-2')}>
              <Controller
                name="cpfCnpj"
                control={control}
                render={({ field }) => {
                  const inputRef = useMask({
                    mask: clientType === 'pf' ? maskCpf : maskCnpj,
                    replacement: { _: /\d/ },
                  });
                  useEffect(() => {
                    setIsValidCpfCnpj(
                      field.value
                        ? clientType === 'pf'
                          ? validateCpf(field.value)
                          : validateCnpj(field.value)
                        : false,
                    );
                  }, [field.value, clientType]);
                  return (
                    <Input
                      id="cpfCnpj"
                      placeholder={`Digite seu ${clientType === 'pf' ? 'CPF' : 'CNPJ'}`}
                      {...register('cpfCnpj')}
                    />
                  );
                }}
              />

              {isValidCpfCnpj && (
                <span className="rounded-full border-2 border-green-500 p-0.5 text-green-500">
                  <Check size={16} />
                </span>
              )}
            </div>

            {errors.cpfCnpj && (
              <small className="text-sm text-red-400">
                {errors.cpfCnpj.message}
              </small>
            )}
          </div>

          {clientType === 'pj' && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="stateRegistration">Inscrição Estadual</Label>

              <Input
                id="stateRegistration"
                placeholder="Digite sua inscrição estadual"
                {...register('stateRegistration')}
              />

              {errors.stateRegistration && (
                <small className="text-sm text-red-400">
                  {errors.stateRegistration.message}
                </small>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>

            <Input
              id="email"
              placeholder="Digite seu email"
              {...register('email')}
            />

            {errors.email && (
              <small className="text-sm text-red-400">
                {errors.email.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="phone">Telefone</Label>

            <Controller
              name="phone"
              control={control}
              render={() => {
                const inputRef = useMask({
                  mask: '(__) _____-____',
                  replacement: { _: /\d/ },
                });
                return (
                  <Input
                    id="phone"
                    placeholder="Digite seu telefone"
                    {...register('phone')}
                    ref={inputRef}
                  />
                );
              }}
            />

            {errors.phone && (
              <small className="text-sm text-red-400">
                {errors.phone.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="observation">Observação</Label>

            <Input
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
        </div>
        <div className={cn('flex w-full justify-between')}>
          <Button
            type="reset"
            className={cn(
              'bg-destructive shadow-destructive mt-2 font-bold',
              'hover:bg-red-700 hover:shadow-[0_0_1px] hover:shadow-red-700',
            )}
          >
            Limpar
          </Button>

          <Button
            type="submit"
            className={cn(
              'mt-2 bg-green-500 font-bold',
              'hover:bg-green-600 hover:shadow-[0_0_1px] hover:shadow-green-600',
            )}
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
