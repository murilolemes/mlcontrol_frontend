import StyledComponentsRegistry from '@/lib/registro';
import GlobalStyles from "@/styles/global-styles";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from './providers';



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
    <html lang="pt-BR">
      <body className={montserrat.variable}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
