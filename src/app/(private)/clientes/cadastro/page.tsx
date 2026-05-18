'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useClient } from '@/context/clientContext';
import { useConsult } from '@/context/consultCnpj';
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
    type: z.enum(['PF', 'PJ']),
    cpfCnpj: z.string().min(1, 'CPF/CNPJ obrigatório'),
    stateRegistration: z.string().optional(),
    email: z.string().email('E-mail inválido').or(z.literal('')).optional(),
    phone: z.string().optional(),
    observation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { type } = data;
    const cpfCnpj = data.cpfCnpj.replace(/\D/g, '');

    if (type === 'PF') {
      if (cpfCnpj.length !== 11 || !validateCpf(cpfCnpj)) {
        ctx.addIssue({
          path: ['cpfCnpj'],
          code: 'custom',
          message: 'CPF inválido',
        });
      }
    }

    if (type === 'PJ') {
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
  const { consult, handleConsult } = useConsult();
  const { createClient } = useClient();
  const [clientType, setClientType] = useState<'PF' | 'PJ'>('PF');
  const [isValidCpfCnpj, setIsValidCpfCnpj] = useState<Boolean | null>(null);
  const [cnpj, setCnpj] = useState<string>('');

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
      // createClient(data);
    } catch (err) {
      toast.error('Erro ao enviar o formulário!');
    }
  }

  function handleConsultCnpj(cnpj: string) {
    handleConsult(cnpj);
    // console.log(cnpj);
  }

  return (
    <div className={cn('flex h-full w-full flex-col gap-4')}>
      <h4 className="text-chart-2 font-bold">Cadastro de Clientes</h4>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          'flex h-full w-full flex-col items-center justify-between p-4',
        )}
      >
        <div className={cn('flex w-full flex-col gap-4 md:max-w-xl')}>
          {/* TIPO DE CLIENTE */}
          <div className={cn('flex items-end justify-between')}>
            <div className={cn('flex w-fit flex-col gap-2')}>
              <Label htmlFor="type" className="text-foreground/60">
                Tipo
              </Label>
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
                        onClick={() => setClientType('PF')}
                      />
                      <Label
                        htmlFor="pf"
                        className="text-foreground/60 text-sm font-normal"
                      >
                        Pessoa Física
                      </Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem
                        value="pj"
                        id="pj"
                        onClick={() => setClientType('PJ')}
                      />
                      <Label
                        htmlFor="pj"
                        className="text-foreground/60 text-sm font-normal"
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
            {clientType === 'PJ' && (
              <Button
                type="button"
                onClick={() => handleConsultCnpj(cnpj)}
                className={cn(
                  'bg-background mt-2 border-2 border-blue-600 font-bold text-blue-600',
                  'hover:text-background text-xs transition-all duration-200 hover:bg-blue-600',
                )}
              >
                Consultar CNPJ
              </Button>
            )}
          </div>

          {/* CPF || CNPJ */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="cpfCnpj" className="text-foreground/60">
              {clientType === 'PF' ? 'CPF' : 'CNPJ'}
            </Label>

            <div className={cn('flex flex-row items-center gap-2')}>
              <Controller
                name="cpfCnpj"
                control={control}
                render={({ field }) => {
                  const inputRef = useMask({
                    mask: clientType === 'PF' ? maskCpf : maskCnpj,
                    replacement: { _: /\d/ },
                  });
                  useEffect(() => {
                    setIsValidCpfCnpj(
                      field.value
                        ? clientType === 'PF'
                          ? validateCpf(field.value)
                          : validateCnpj(field.value)
                        : false,
                    );

                    setCnpj(field.value);
                  }, [field.value, clientType]);
                  return (
                    <Input
                      id="cpfCnpj"
                      placeholder={`Digite seu ${clientType === 'PF' ? 'CPF' : 'CNPJ'}`}
                      ref={inputRef}
                      value={field.value || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                  );
                }}
              />

              {isValidCpfCnpj && (
                <span className="rounded-full border-2 border-green-600 p-0.5 text-green-600">
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

          {/* NOME */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-foreground/60">
              Nome
            </Label>

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

          {/* NOME FANTASIA */}
          {clientType === 'PJ' && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="fantasyName" className="text-foreground/60">
                Nome Fantasia
              </Label>

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

          {/* INSCRIÇÃO ESTADUAL */}
          {clientType === 'PJ' && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="stateRegistration" className="text-foreground/60">
                Inscrição Estadual
              </Label>

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

          {/* E-MAIL */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-foreground/60">
              E-mail
            </Label>

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

          {/* TELEFONE */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-foreground/60">
              Telefone
            </Label>

            <Controller
              name="phone"
              control={control}
              render={({ field }) => {
                const inputRef = useMask({
                  mask: '(__) _____-____',
                  replacement: { _: /\d/ },
                });
                return (
                  <Input
                    id="phone"
                    placeholder="Digite seu telefone"
                    ref={inputRef}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
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

          {/* OBSERVAÇÃO */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="observation" className="text-foreground/60">
              Observação
            </Label>

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

        {/* BOTÕES  */}
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
