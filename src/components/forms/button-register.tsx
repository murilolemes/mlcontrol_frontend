'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function ButtonRegister() {
  return (
    <div className={cn('flex w-full justify-between')}>
      <Button
        type="reset"
        className={cn(
          'text-destructive bg-red-100 transition-all duration-200 hover:bg-red-200',
        )}
      >
        Limpar
      </Button>

      <Button
        type="submit"
        className={cn(
          'bg-green-100 text-green-700 transition-all duration-200 hover:bg-green-200',
        )}
      >
        Cadastrar
      </Button>
    </div>
  );
}
