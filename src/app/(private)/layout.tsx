'use client';

import { AppSidebar } from '@/components/sideBar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/context/authContext';
import { ClientProvider } from '@/context/clientContext';
import { ConsultCnpjProvider } from '@/context/consultCnpj';
import { MenuProvider } from '@/context/menuContext';
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
            <TooltipProvider>
              <SidebarProvider>
                <AppSidebar />
                <ConsultCnpjProvider>{children}</ConsultCnpjProvider>
              </SidebarProvider>
            </TooltipProvider>
          </ProviderPrivate>
        </ClientProvider>
      </MenuProvider>
    </AuthProvider>
  );
}
