"use client";

import { useAuth } from "@/context/authContext";
import { useMenu } from "@/context/menuContext";
import { api } from "@/services/api";
import { ListIcon, UserIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ButtonMenu, HeaderContainer, HeaderContent, UserAvatar, UserInfo, UserProfile } from "./styles";

export default function Header() {
  const router = useRouter();
  const { user } = useAuth();
  const { setOpenMenu, openMenu } = useMenu();

  const [userProfile, setUserProfile] = useState(false);

  async function handleLogout() {
    try {
      await api.get("/auth/logout");

      router.push("/login");
      toast.success("Logout realizado com sucesso!");
    } catch (err) {
      toast.error("Falha ao realizar logout!");
    }
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <ButtonMenu onClick={() => setOpenMenu(!openMenu)}>
          <ListIcon size={24} weight="bold" />
        </ButtonMenu>
        <UserInfo>
          <p>Seja bem vindo, <span>{user?.name}</span>!</p>
          <UserAvatar onClick={() => setUserProfile(!userProfile)}>
            <UserIcon size={16} weight="fill" />
          </UserAvatar>
          <UserProfile $isActive={userProfile}>
            <span />
            <div className="itens">
              <button onClick={handleLogout}>Sair</button>
            </div>
          </UserProfile>
        </UserInfo>
      </HeaderContent>
    </HeaderContainer>
  )
}