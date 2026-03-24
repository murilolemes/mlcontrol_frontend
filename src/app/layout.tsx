import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from './providers';

import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
      <body className={cn("font-sans", geist.variable, montserrat.variable)}>
        {/* <StyledComponentsRegistry> */}
        {/* <GlobalStyles /> */}
        <Providers>{children}</Providers>
        {/* </StyledComponentsRegistry> */}
      </body>
    </html >
  );
}
