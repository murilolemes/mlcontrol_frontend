'use client';

import {
  DollarSign,
  FileUser,
  House,
  Settings,
  TrendingDown,
  TrendingUp,
  UserRoundPlus,
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
    name: 'Dashboard',
    icon: <House size={16} strokeWidth={3} />,
    path: '/dashboard',
  },
  {
    name: 'Clientes',
    icon: <UsersRound size={16} strokeWidth={3} />,
    path: '',
    children: [
      {
        name: 'Lista de Clientes',
        icon: <FileUser size={16} strokeWidth={2} />,
        path: '/clientes/lista',
      },
      {
        name: 'Cadastro de Clientes',
        icon: <UserRoundPlus size={16} strokeWidth={2} />,
        path: '/clientes/cadastro',
      },
    ],
  },
  {
    name: 'Financeiro',
    icon: <DollarSign size={16} strokeWidth={3} />,
    path: '',
    children: [
      {
        name: 'Contas à Receber',
        icon: <TrendingUp size={16} strokeWidth={2} />,
        path: '/financeiro/contasReceber',
      },
      {
        name: 'Contas à Pagar',
        icon: <TrendingDown size={16} strokeWidth={2} />,
        path: '/financeiro/contasPagar',
      },
    ],
  },
  {
    name: 'Config. Financeira',
    icon: <Settings size={16} strokeWidth={3} />,
    path: '',
    children: [
      {
        name: 'Centro de Custo',
        icon: <Settings size={16} strokeWidth={2} />,
        path: '/financeiro/centroCusto',
      },
      {
        name: 'Tipo de Plano',
        icon: <Settings size={16} strokeWidth={2} />,
        path: '/financeiro/tipoPlano',
      },
      {
        name: 'Plano de Conta',
        icon: <Settings size={16} strokeWidth={2} />,
        path: '/financeiro/planoContas',
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
