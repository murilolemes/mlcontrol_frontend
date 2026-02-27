"use client";

import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import {
  SideBarButton,
  SideBarSubItem
} from "./styles";

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
  isHovering
}: SideBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = openSubMenu === name;

  const isActive = useMemo(() => {
    return path ? pathname === path : false;
  }, [pathname, path]);

  const hasActiveChild = useMemo(() => {
    return children?.some(child => child.path === pathname);
  }, [children, pathname]);

  const shouldBeOpen = isOpen || hasActiveChild;

  const shouldShowText = !isCollapsed || isHovering;

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
      <SideBarButton
        onClick={handleClick}
        $activeItem={isActive}
        $collapsed={isCollapsed && !isHovering}
      >
        <div className="description-item">
          {icon}
          {shouldShowText && <p>{name}</p>}
        </div>

        {children && shouldShowText && (
          shouldBeOpen
            ? <CaretUpIcon size={16} weight="bold" />
            : <CaretDownIcon size={16} weight="bold" />
        )}
      </SideBarButton>

      {children && (
        <SideBarSubItem
          $subMenu={shouldBeOpen && shouldShowText}
          $collapsed={isCollapsed && !isHovering}
        >
          {children.map(child => (
            <SideBarButtons
              key={child.name}
              {...child}
              openSubMenu={openSubMenu}
              setOpenSubMenu={setOpenSubMenu}
              isCollapsed={isCollapsed}
              isHovering={isHovering}
            />
          ))}
        </SideBarSubItem>
      )}
    </>
  );
}