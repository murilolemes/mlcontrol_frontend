"use client";

import { useMenu } from "@/context/menuContext";
import { useState } from "react";
import SideBarButtons from "./sideBarButtons";

import {
  SideBarContainer,
  SideBarContent,
  SideBarHeader,
  SideBarItem
} from "./styles";

export default function SideBar() {
  const { openMenu, menuItems } = useMenu();

  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <SideBarContainer
      $openMenu={openMenu}
      $isHovering={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <SideBarHeader>
        <img
          src="/assets/logo-mlControl.svg"
          alt="Logo mlControl"
        />
      </SideBarHeader>
      <SideBarContent>
        {menuItems.map((item) => (
          <SideBarItem key={item.name}>
            <SideBarButtons
              {...item}
              openSubMenu={openSubMenu}
              setOpenSubMenu={setOpenSubMenu}
              isCollapsed={openMenu}
              isHovering={isHovering}
            />
          </SideBarItem>
        ))}
      </SideBarContent>
    </SideBarContainer>
  )
}