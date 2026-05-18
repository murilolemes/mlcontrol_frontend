'use client';

import Header from '@/components/header';
import SideBar from '@/components/sideBar';

import { AuthProvider } from '@/context/authContext';
import { ClientProvider } from '@/context/clientContext';
import { ConsultCnpjProvider } from '@/context/consultCnpj';
import { MenuProvider } from '@/context/menuContext';
import { cn } from '@/lib/utils';
import { ProviderPrivate } from './providerPrivate';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <MenuProvider>
        <ClientProvider>
          <ProviderPrivate>
            <div className={cn('bg-foreground/5 flex h-screen flex-col')}>
              <Header />
              <div className={cn('flex h-full w-full')}>
                <SideBar />
                <div
                  className={cn(
                    'bg-background border-foreground/10 h-[calc(100vh-72px)] flex-1 rounded-tl-md border-t-2 border-l-2 p-2',
                  )}
                >
                  <ConsultCnpjProvider>{children}</ConsultCnpjProvider>
                </div>
              </div>
            </div>
          </ProviderPrivate>
        </ClientProvider>
      </MenuProvider>
    </AuthProvider>
  );
}
