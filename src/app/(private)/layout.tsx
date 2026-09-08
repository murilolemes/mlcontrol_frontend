'use client';

import { AppSidebar } from '@/components/sideBar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/context/authContext';
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
        <ProviderPrivate>
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar />
              {children}
            </SidebarProvider>
          </TooltipProvider>
        </ProviderPrivate>
      </MenuProvider>
    </AuthProvider>
  );
}
