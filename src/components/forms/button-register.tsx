'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function ButtonRegister() {
  return (
    <div className={cn('flex w-full justify-between')}>
      <Button
        type="reset"
        className={cn(
          'bg-background text-destructive border-destructive border-2 font-bold',
          'hover:text-background transition-all duration-200 hover:bg-red-700',
        )}
      >
        Limpar
      </Button>

      <Button
        type="submit"
        className={cn(
          'bg-background border-2 border-green-600 font-bold text-green-600',
          'hover:text-background transition-all duration-200 hover:bg-green-600',
        )}
      >
        Cadastrar
      </Button>
    </div>
  );
}
