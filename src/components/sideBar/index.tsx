'use client';

import { useMenu } from '@/context/menuContext';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import SideBarButtons from './sideBarButtons';

export default function SideBar() {
  const { openMenu, menuItems, setOpenMenu } = useMenu();

  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const isOpen = openMenu ? 'w-fit' : 'w-full max-w-56';
  const isHover = isHovering && 'w-full max-w-56';

  return (
    // MENU
    <aside
      className={cn(
        `${isOpen} ${isHover} border-foreground/10 overflow-hidden`,
        'flex transition-all duration-300',
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-full max-w-56 p-2">
        {/* BOTÃO MENU */}
        <div
          className={cn(
            `flex items-center ${openMenu ? 'justify-start' : 'justify-end'}`,
          )}
        >
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className={cn(
              'text-foreground/50 hover:text-foreground/70 flex items-center justify-center',
              'bg-background shadow-foreground/50 mb-2 rounded-sm p-1.5 shadow-[0_0_2px]',
              'hover:shadow-foreground/70',
            )}
          >
            {openMenu ? (
              <Menu size={16} strokeWidth={2} />
            ) : (
              <X size={16} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* MENU ITENS */}
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={cn(
              'shadow-foreground/50 mb-2 flex w-full max-w-56 flex-col overflow-hidden rounded-sm shadow-[0_0_2px]',
            )}
          >
            <SideBarButtons
              {...item}
              openSubMenu={openSubMenu}
              setOpenSubMenu={setOpenSubMenu}
              isCollapsed={openMenu}
              isHovering={isHovering}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
