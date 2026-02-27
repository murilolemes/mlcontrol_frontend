"use client";

import Header from "@/components/header";
import SideBar from "@/components/sideBar";

import { AuthProvider } from "@/context/authContext";
import { MenuProvider } from "@/context/menuContext";
import { LayoutContainer, LayoutContent } from "./layoutStyles";
import { ProviderPrivate } from "./providerPrivate";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <AuthProvider>
      <MenuProvider>
        <ProviderPrivate>
          <LayoutContainer>
            <SideBar />
            <LayoutContent>
              <Header />
              {children}
            </LayoutContent>
          </LayoutContainer>
        </ProviderPrivate>
      </MenuProvider>
    </AuthProvider>
  )
}