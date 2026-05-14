'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

type ItensProps = {
  name: string;
  icon: React.ReactNode;
  path: string | null;
};

interface SideBarProps {
  name: string;
  icon: React.ReactNode;
  path: string | null;
  children?: ItensProps[];
  openSubMenu: string | null;
  setOpenSubMenu: (value: string | null) => void;
  isCollapsed: boolean;
  isHovering: boolean;
}

export default function SideBarButtons({
  name,
  icon,
  path,
  children,
  openSubMenu,
  setOpenSubMenu,
  isCollapsed,
  isHovering,
}: SideBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = openSubMenu === name;

  // RETORNA QUAL ROTA ESTÁ EM USO
  const isActive = useMemo(() => {
    return path ? pathname === path : false;
  }, [pathname, path]);

  // VERIFICA SE EXISTE UMA SUB ROTA E RETORNA CASO EXISTA
  const hasActiveChild = useMemo(() => {
    return children?.some((child) => child.path === pathname);
  }, [children, pathname]);

  const shouldBeOpen = isOpen || hasActiveChild;
  const shouldShowText = !isCollapsed || isHovering;
  const collapsed = isCollapsed && !isHovering;

  // LIDA COM O CLIQUE DO BOTÃO PARA REALIZAR O REDIRECIONAMENTO DAS ROTAS
  function handleClick() {
    if (children) {
      setOpenSubMenu(isOpen ? null : name);
      return;
    }

    if (path) {
      router.push(path);
    }
  }

  return (
    <>
      {/* BOTÃO DE ROTAS DO MENU */}
      <button
        onClick={handleClick}
        className={cn(
          'flex min-h-8 w-full items-center p-1.5 transition-all duration-200',
          `${collapsed ? 'justify-center' : 'justify-between'} ${
            isActive
              ? 'text-chart-3 bg-chart-1/20 font-semibold'
              : 'bg-background hover:bg-chart-1/10 text-chart-2'
          } `,
        )}
      >
        <div
          className={`flex w-full items-center transition-all duration-200 ${
            collapsed ? 'gap-0' : 'gap-1'
          }`}
        >
          {/* ÍCONE PRINCIPAL */}
          {icon}

          {/* NOME DA ROTA */}
          {shouldShowText && (
            <p
              className={`line-clamp-1 w-full text-start text-sm transition-all duration-200 ${
                collapsed
                  ? '-translate-x-1 opacity-0'
                  : 'translate-x-0 opacity-100'
              }`}
            >
              {name}
            </p>
          )}
        </div>

        {/* ÍCONE CASO TENHA SUB ROTA */}
        {children &&
          shouldShowText &&
          (shouldBeOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
      </button>

      {/* BOTÃO PARA SUB ROTA */}
      {children && (
        <div
          className={`w-full overflow-hidden transition-all duration-300 ${
            shouldBeOpen && shouldShowText
              ? 'max-h-120 opacity-100'
              : 'max-h-0 opacity-0'
          } `}
        >
          {children.map((child) => (
            <SideBarButtons
              key={child.name}
              {...child}
              openSubMenu={openSubMenu}
              setOpenSubMenu={setOpenSubMenu}
              isCollapsed={isCollapsed}
              isHovering={isHovering}
            />
          ))}
        </div>
      )}
    </>
  );
}
