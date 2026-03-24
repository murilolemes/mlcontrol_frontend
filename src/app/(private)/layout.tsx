'use client';

import Header from '@/components/header';
import SideBar from '@/components/sideBar';

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
          <div className="flex h-screen">
            <SideBar />
            <div className="h-full w-full">
              <Header />
              <div className="h-[calc(100vh-72px)] p-2">{children}</div>
            </div>
          </div>
        </ProviderPrivate>
      </MenuProvider>
    </AuthProvider>
  );
}
