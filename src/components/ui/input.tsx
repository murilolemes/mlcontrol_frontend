import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'shadow-foreground file:text-foreground placeholder:text-ring',
        'focus-visible:blue-700 focus-visible:blue-700 disabled:bg-input/50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        'dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50',
        'dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 rounded-lg border-2',
        'text-chart-3 bg-transparent px-2.5 py-1 shadow-[0_0_2px] transition-colors',
        'outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent',
        'focus-visible:border-chart-2 file:text-sm file:font-medium',
        'focus-visible:shadow-chart-2 focus-visible:shadow-[0_0_4px]',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-3 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
