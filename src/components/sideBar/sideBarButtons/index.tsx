"use client";

import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

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
  const collapsed = isCollapsed && !isHovering;

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
      <button
        onClick={handleClick}
        className={`
          w-full px-2 py-2.5 flex items-center transition-all duration-200
          ${collapsed ? "justify-center" : "justify-between"}
          ${isActive
            ? "bg-blue-100 text-blue-900 font-semibold"
            : "bg-white text-blue-500 hover:bg-gray-200"}
        `}
      >
        <div
          className={`flex items-center transition-all duration-200 ${collapsed ? "gap-0" : "gap-2"
            }`}
        >
          {icon}

          {shouldShowText && (
            <p
              className={`transition-all duration-200 ${collapsed
                ? "opacity-0 -translate-x-1"
                : "opacity-100 translate-x-0"
                }`}
            >
              {name}
            </p>
          )}
        </div>

        {children && shouldShowText && (
          shouldBeOpen
            ? <CaretUpIcon size={16} weight="bold" />
            : <CaretDownIcon size={16} weight="bold" />
        )}
      </button>

      {children && (
        <div
          className={`
            w-full overflow-hidden transition-all duration-300
            ${shouldBeOpen && shouldShowText
              ? "max-h-120 opacity-100"
              : "max-h-0 opacity-0"}
          `}
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
        </div>
      )}
    </>
  );
}


// "use client";

// import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
// import { usePathname, useRouter } from "next/navigation";
// import { useMemo } from "react";

// import {
//   SideBarButton,
//   SideBarSubItem
// } from "./styles";

// type ItensProps = {
//   name: string;
//   icon: React.ReactNode;
//   path: string | null;
// };

// interface SideBarProps {
//   name: string;
//   icon: React.ReactNode;
//   path: string | null;
//   children?: ItensProps[];
//   openSubMenu: string | null;
//   setOpenSubMenu: (value: string | null) => void;
//   isCollapsed: boolean;
//   isHovering: boolean;
// }

// export default function SideBarButtons({
//   name,
//   icon,
//   path,
//   children,
//   openSubMenu,
//   setOpenSubMenu,
//   isCollapsed,
//   isHovering
// }: SideBarProps) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const isOpen = openSubMenu === name;

//   const isActive = useMemo(() => {
//     return path ? pathname === path : false;
//   }, [pathname, path]);

//   const hasActiveChild = useMemo(() => {
//     return children?.some(child => child.path === pathname);
//   }, [children, pathname]);

//   const shouldBeOpen = isOpen || hasActiveChild;

//   const shouldShowText = !isCollapsed || isHovering;

//   function handleClick() {
//     if (children) {
//       setOpenSubMenu(isOpen ? null : name);
//       return;
//     }

//     if (path) {
//       router.push(path);
//     }
//   }

//   return (
//     <>
//       <SideBarButton
//         onClick={handleClick}
//         $activeItem={isActive}
//         $collapsed={isCollapsed && !isHovering}
//       >
//         <div className="description-item">
//           {icon}
//           {shouldShowText && <p>{name}</p>}
//         </div>

//         {children && shouldShowText && (
//           shouldBeOpen
//             ? <CaretUpIcon size={16} weight="bold" />
//             : <CaretDownIcon size={16} weight="bold" />
//         )}
//       </SideBarButton>

//       {children && (
//         <SideBarSubItem
//           $subMenu={shouldBeOpen && shouldShowText}
//           $collapsed={isCollapsed && !isHovering}
//         >
//           {children.map(child => (
//             <SideBarButtons
//               key={child.name}
//               {...child}
//               openSubMenu={openSubMenu}
//               setOpenSubMenu={setOpenSubMenu}
//               isCollapsed={isCollapsed}
//               isHovering={isHovering}
//             />
//           ))}
//         </SideBarSubItem>
//       )}
//     </>
//   );
// }