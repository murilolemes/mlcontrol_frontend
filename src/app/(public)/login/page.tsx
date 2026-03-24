'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';
import Image from 'next/image';
import { toast } from 'react-toastify';

const loginFormSchema = z.object({
  login: z.string().min(3, 'O login deve ter no mínimo 3 caracteres'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    control,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {},
  });

  async function onSubmit(data: LoginFormSchema) {
    try {
      await api.post('/auth/login', data);

      toast.success('Login realizado com sucesso!');
      reset();

      router.push('/dashboard');
    } catch (err) {
      toast.error('Login ou senha inválido!');
    }
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-112.5 flex-col">
        <div className="mb-4 flex justify-center">
          <Image
            src="/assets/logo-mlControl.svg"
            alt="Logo mlControl"
            width={160}
            height={120}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="login" className="font-bold text-blue-900">
              Login
            </Label>

            <Input
              id="login"
              placeholder="Digite seu login"
              {...register('login')}
              className="placeholder:text-ring text-blue-900"
            />

            {errors.login && (
              <small className="text-sm text-red-400">
                {errors.login.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="font-bold text-blue-900">
              Senha
            </Label>

            <Input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              {...register('password')}
              className="placeholder:text-ring text-blue-900"
            />

            {errors.password && (
              <small className="text-sm text-red-400">
                {errors.password.message}
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
    </main>
  );
}
