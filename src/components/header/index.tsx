"use client";

import { useAuth } from "@/context/authContext";
import { useMenu } from "@/context/menuContext";
import { ListIcon, UserIcon } from "@phosphor-icons/react";
import { ButtonMenu, HeaderContainer, HeaderContent, UserAvatar, UserInfo } from "./styles";

export default function Header() {
  const { user } = useAuth();
  const { setOpenMenu, openMenu } = useMenu();

  return (
    <HeaderContainer>
      <HeaderContent>
        <ButtonMenu onClick={() => setOpenMenu(!openMenu)}>
          <ListIcon size={24} weight="bold" />
        </ButtonMenu>
        <UserInfo>
          <p>Seja bem vindo, <span>{user?.name}</span>!</p>
          <UserAvatar>
            <UserIcon size={16} weight="fill" />
          </UserAvatar>
        </UserInfo>
      </HeaderContent>
    </HeaderContainer>
  )
}