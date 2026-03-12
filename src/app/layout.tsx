import StyledComponentsRegistry from '@/lib/registro';
import GlobalStyles from "@/styles/global-styles";
import type { Metadata } from "next";
import { Montserrat, Geist } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from './providers';

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Ml Control",
  description: "ML Control - Sistema de Controle de Vendas",
  icons: {
    icon: "/assets/logo-mlControl.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body className={montserrat.variable}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
