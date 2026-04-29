'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={cn('flex h-screen flex-col items-center p-4')}>
      <h1 className="text-3xl font-bold text-blue-950">MLControl</h1>

      <p className="text-gray-500">
        O MLControl é um sistema de controle para gerenciar modelos de machine
        learning.
      </p>
      <Link
        href={'/login'}
        className="mt-4 rounded-xl bg-blue-950 px-4 py-2 text-white"
      >
        Acesse para começar a usar
      </Link>
    </main>
  );
}
