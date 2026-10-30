import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from './providers';

import { cn } from '@/lib/utils';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Ml Control',
  description: 'ML Control - Sistema de Controle de Vendas',
  icons: {
    icon: '/assets/logo-mlControl.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn(montserrat.variable)}>
      <body className={cn('bg-sidebar font-sans')}>
        <Providers>{children}</Providers>
      </body>
      <Analytics />
    </html>
  );
}
