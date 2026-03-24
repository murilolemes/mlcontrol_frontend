"use client";

import { useMenu } from "@/context/menuContext";
import { useState } from "react";
import SideBarButtons from "./sideBarButtons";

export default function SideBar() {
  const { openMenu, menuItems } = useMenu();

  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const width =
    openMenu && !isHovering ? "w-16" : "min-w-fit";

  return (
    <aside
      className={`${width} border-r border-blue-900/30 overflow-hidden transition-all duration-300 `}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <header className="w-full h-18 p-2 border-b border-blue-900/30 flex items-center justify-center">
        <img
          src="/assets/logo-mlControl.svg"
          alt="Logo mlControl"
          className="w-full h-full"
        />
      </header>

      <div className="w-full p-2">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="
              bg-white 
              shadow-[0_0_4px] 
              shadow-blue-900 
              rounded-md 
              flex 
              flex-col 
              mb-2 
              overflow-hidden"
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






// "use client";

// import { useMenu } from "@/context/menuContext";
// import { useState } from "react";
// import SideBarButtons from "./sideBarButtons";

// import {
//   SideBarContainer,
//   SideBarContent,
//   SideBarHeader,
//   SideBarItem
// } from "./styles";

// export default function SideBar() {
//   const { openMenu, menuItems } = useMenu();

//   const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
//   const [isHovering, setIsHovering] = useState(false);

//   return (
//     <SideBarContainer
//       $openMenu={openMenu}
//       $isHovering={isHovering}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       <SideBarHeader>
//         <img
//           src="/assets/logo-mlControl.svg"
//           alt="Logo mlControl"
//         />
//       </SideBarHeader>
//       <SideBarContent>
//         {menuItems.map((item) => (
//           <SideBarItem key={item.name}>
//             <SideBarButtons
//               {...item}
//               openSubMenu={openSubMenu}
//               setOpenSubMenu={setOpenSubMenu}
//               isCollapsed={openMenu}
//               isHovering={isHovering}
//             />
//           </SideBarItem>
//         ))}
//       </SideBarContent>
//     </SideBarContainer>
//   )
// }