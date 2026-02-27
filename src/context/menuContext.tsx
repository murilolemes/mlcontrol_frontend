"use client";

import {
  CurrencyDollarIcon,
  HouseIcon,
  ListDashesIcon,
  ListPlusIcon,
  StorefrontIcon,
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
        icon: <UsersThreeIcon size={16} weight="bold" />,
        path: "/clientes",
      }, {
        name: "Cadastro de Clientes",
        icon: <UserCirclePlusIcon size={16} weight="bold" />,
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
        icon: <TrendUpIcon size={16} weight="bold" />,
        path: "",
      },
      {
        name: "Contas à Pagar",
        icon: <TrendDownIcon size={16} weight="bold" />,
        path: "/financeiro/contasPagar",
      },
    ],
  },
  {
    name: "Vendas",
    icon: <StorefrontIcon size={16} weight="fill" />,
    path: "",
    children: [
      {
        name: "Lista de Vendas",
        icon: <ListDashesIcon size={16} weight="bold" />,
        path: "",
      },
      {
        name: "Nova Venda",
        icon: <ListPlusIcon size={16} weight="bold" />,
        path: "",
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