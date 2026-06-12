'use client';

import {
  DollarSign,
  House,
  HouseHeart,
  Settings,
  UsersRound,
} from 'lucide-react';

import { createContext, ReactNode, useContext, useState } from 'react';

type MenuContextType = {
  openMenu: boolean;
  setOpenMenu: (menu: boolean) => void;
  menuItems: typeof menuItems;
};

const menuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: House,
  },
  {
    title: 'Clientes',
    url: '',
    icon: UsersRound,
    items: [
      {
        title: 'Lista de Clientes',
        url: '/clientes/lista',
      },
      {
        title: 'Cadastro de Clientes',
        url: '/clientes/cadastro',
      },
    ],
  },
  {
    title: 'Financeiro',
    url: '',
    icon: DollarSign,
    items: [
      {
        title: 'Contas à Receber',
        url: '/financeiro/contasReceber',
      },
      {
        title: 'Contas à Pagar',
        url: '/financeiro/contasPagar',
      },
    ],
  },
  {
    title: 'Anamnese',
    url: '',
    icon: HouseHeart,
    items: [
      {
        title: 'Cadastro',
        url: '/anamnese/cadastro',
      },
    ],
  },
  {
    title: 'Config. Financeira',
    url: '',
    icon: Settings,
    items: [
      {
        title: 'Centro de Custo',
        url: '/financeiro/centroCusto',
      },
      {
        title: 'Tipo de Plano',
        url: '/financeiro/tipoPlano',
      },
      {
        title: 'Plano de Conta',
        url: '/financeiro/planoContas',
      },
    ],
  },
];

const MenuContext = createContext({} as MenuContextType);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <MenuContext.Provider
      value={{
        openMenu,
        setOpenMenu,
        menuItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
