"use client";

import { useAuth } from "@/context/authContext";
import { useMenu } from "@/context/menuContext";
import { api } from "@/services/api";

import { ListIcon, UserIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const router = useRouter();
  const { user } = useAuth();
  const { setOpenMenu, openMenu } = useMenu();

  async function handleLogout() {
    try {
      await api.get("/auth/logout");

      router.push("/login");
      toast.success("Logout realizado com sucesso!");
    } catch {
      toast.error("Falha ao realizar logout!");
    }
  }

  return (
    <header className="w-full h-18 px-4 border-b  border-blue-900/30 flex items-center">
      <div className="w-full flex items-center justify-between">

        {/* BOTÃO MENU */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="text-blue-900 flex items-center justify-center"
        >
          <ListIcon size={24} weight="bold" />
        </button>

        {/* USER AREA */}
        <div className="flex items-center gap-3">

          <p className="text-sm text-blue-900">
            Seja bem vindo, <span className="font-semibold">{user?.name}</span>!
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-8 h-8 rounded-full bg-white shadow-[0_0_4px] shadow-blue-950 flex items-center justify-center">
                <UserIcon size={16} weight="fill" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer justify-center"
              >
                Sair
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

        </div>

      </div>
    </header>
  );
}




// "use client";

// import { useAuth } from "@/context/authContext";
// import { useMenu } from "@/context/menuContext";
// import { api } from "@/services/api";
// import { ListIcon, UserIcon } from "@phosphor-icons/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { ButtonMenu, HeaderContainer, HeaderContent, UserAvatar, UserInfo, UserProfile } from "./styles";

// export default function Header() {
//   const router = useRouter();
//   const { user } = useAuth();
//   const { setOpenMenu, openMenu } = useMenu();

//   const [userProfile, setUserProfile] = useState(false);

//   async function handleLogout() {
//     try {
//       await api.get("/auth/logout");

//       router.push("/login");
//       toast.success("Logout realizado com sucesso!");
//     } catch (err) {
//       toast.error("Falha ao realizar logout!");
//     }
//   }

//   return (
//     <HeaderContainer>
//       <HeaderContent>
//         <ButtonMenu onClick={() => setOpenMenu(!openMenu)}>
//           <ListIcon size={24} weight="bold" />
//         </ButtonMenu>
//         <UserInfo>
//           <p>Seja bem vindo, <span>{user?.name}</span>!</p>
//           <UserAvatar onClick={() => setUserProfile(!userProfile)}>
//             <UserIcon size={16} weight="fill" />
//           </UserAvatar>
//           <UserProfile $isActive={userProfile}>
//             <span />
//             <div className="itens">
//               <button onClick={handleLogout}>Sair</button>
//             </div>
//           </UserProfile>
//         </UserInfo>
//       </HeaderContent>
//     </HeaderContainer>
//   )
// }