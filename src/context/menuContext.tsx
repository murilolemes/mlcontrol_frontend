"use client";

import {
  CurrencyDollarIcon,
  HouseIcon,
  InvoiceIcon,
  TrendDownIcon,
  TrendUpIcon,
  UserCirclePlusIcon,
  UsersThreeIcon
} from "@phosphor-icons/react";

import {
  createContext,
  ReactNode,
  useContext,
  useState
} from "react";

type MenuContextType = {
  openMenu: boolean;
  setOpenMenu: (menu: boolean) => void;
  menuItems: typeof menuItems;
}

const menuItems = [
  {
    name: "Dashboard",
    icon: <HouseIcon size={16} weight="fill" />,
    path: "/dashboard",
  },
  {
    name: "Clientes",
    icon: <UsersThreeIcon size={16} weight="fill" />,
    path: "",
    children: [
      {
        name: "Lista de Clientes",
        icon: <UsersThreeIcon size={16} weight="regular" />,
        path: "/clientes",
      }, {
        name: "Cadastro de Clientes",
        icon: <UserCirclePlusIcon size={16} weight="regular" />,
        path: "",
      },
    ]
  },
  {
    name: "Financeiro",
    icon: <CurrencyDollarIcon size={16} weight="fill" />,
    path: "",
    children: [
      {
        name: "Contas à Receber",
        icon: <TrendUpIcon size={16} weight="regular" />,
        path: "/financeiro/contasReceber",
      },
      {
        name: "Contas à Pagar",
        icon: <TrendDownIcon size={16} weight="regular" />,
        path: "/financeiro/contasPagar",
      },
      {
        name: "Config. Financeira",
        icon: <InvoiceIcon size={16} weight="regular" />,
        path: "/financeiro/configFinanceira",
      },
    ],
  },
];

const MenuContext = createContext({} as MenuContextType);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <MenuContext.Provider value={{
      openMenu,
      setOpenMenu,
      menuItems,
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}