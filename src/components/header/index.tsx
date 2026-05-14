'use client';

import { useAuth } from '@/context/authContext';
import { api } from '@/services/api';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { UserRound } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const { user } = useAuth();

  // LIDA COM BOTÃO DE LOGOUT
  async function handleLogout() {
    try {
      await api.get('/auth/logout');

      router.push('/login');
      toast.success('Logout realizado com sucesso!');
    } catch {
      toast.error('Falha ao realizar logout!');
    }
  }

  return (
    // CABEÇALHO
    <header
      className={cn('border-foreground/10 flex h-18 w-full items-center px-4')}
    >
      <div className="flex h-full w-full items-center justify-between">
        {/* Logo */}
        <div className="flex h-full items-center justify-center py-2">
          <img
            src="/assets/logo-mlControl.svg"
            alt="Logo mlControl"
            className="h-full w-full"
          />
        </div>

        {/* USER AREA */}
        <div className="flex items-center gap-3">
          <p className="text-chart-2 text-xs">
            Seja bem vindo,{' '}
            <span className="text-chart-3 text-sm">{user?.name}</span>!
          </p>

          {/* DROP MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full',
                  'shadow-foreground bg-background shadow-[0_0_2px]',
                )}
              >
                {/* AVATAR */}
                <UserRound
                  size={16}
                  className="text-foreground/30"
                  strokeWidth={3}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              {/* LOGOUT */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer justify-center"
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
