'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function normalizePath(path: string) {
  if (!path || path === '/') {
    return '/';
  }

  return path.replace(/\/+$/, '');
}

function isPathActive(currentPath: string, targetPath: string) {
  const normalizedCurrentPath = normalizePath(currentPath);
  const normalizedTargetPath = normalizePath(targetPath);

  if (normalizedTargetPath === '/') {
    return normalizedCurrentPath === '/';
  }

  return (
    normalizedCurrentPath === normalizedTargetPath ||
    normalizedCurrentPath.startsWith(`${normalizedTargetPath}/`)
  );
}

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

function NavMainItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const hasChildren = Boolean(item.items?.length);
  const isItemActive = hasChildren
    ? item.items!.some((subItem) => isPathActive(pathname, subItem.url))
    : isPathActive(pathname, item.url);

  const [manualOpen, setManualOpen] = useState(false);

  if (hasChildren) {
    const collapsibleOpen = isItemActive || manualOpen;

    return (
      <Collapsible
        open={collapsibleOpen}
        onOpenChange={(nextOpen) => {
          if (!isItemActive) {
            setManualOpen(nextOpen);
          }
        }}
        className="group/collapsible"
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} isActive={isItemActive}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={isPathActive(pathname, subItem.url)}
                >
                  <Link href={subItem.url}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuButton asChild tooltip={item.title} isActive={isItemActive}>
      <Link href={item.url}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  );
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <NavMainItem item={item} pathname={pathname} />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
