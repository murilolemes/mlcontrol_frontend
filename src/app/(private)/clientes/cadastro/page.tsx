'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { validateCnpj } from '@/utils/validateCnpj';
import { validateCpf } from '@/utils/validateCpf';
import { toast } from 'react-toastify';

const clientFormSchema = z.object({
  cpf: z
    .string()
    .min(1, 'CPF obrigatorio')
    .refine(
      (value) => value.length === 11 && validateCpf(value),
      'CPF invalido',
    ),
  cnpj: z
    .string()
    .min(1, 'CNPJ obrigatorio')
    .refine(
      (value) => value.length === 14 && validateCnpj(value),
      'CNPJ invalido',
    ),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>;

export default function CreateClient() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {},
  });

  async function onSubmit(data: ClientFormSchema) {
    try {
      console.log('cliquei no submit', data);
    } catch (err) {
      toast.error('Client ou senha inválido!');
    }
  }

  return (
    <div>
      <h4>Cadastro de Clientes</h4>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="cpf" className="font-bold text-blue-900">
            CPF
          </Label>

          <Input
            id="cpf"
            placeholder="Digite seu CPF"
            {...register('cpf')}
            className="placeholder:text-ring text-blue-900"
          />

          {errors.cpf && (
            <small className="text-sm text-red-400">{errors.cpf.message}</small>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="cnpj" className="font-bold text-blue-900">
            CNPJ
          </Label>

          <Input
            id="cnpj"
            placeholder="Digite seu CNPJ"
            {...register('cnpj')}
            className="placeholder:text-ring text-blue-900"
          />

          {errors.cnpj && (
            <small className="text-sm text-red-400">
              {errors.cnpj.message}
            </small>
          )}
        </div>

        <Button
          type="submit"
          className={cn(
            'mt-2 bg-blue-900 font-bold shadow-[0_0_2px] shadow-blue-700',
            'hover:bg-blue-800 hover:shadow-[0_0_4px]',
          )}
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}
