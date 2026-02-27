"use client";

import styled from "styled-components";

interface SideBarContainerProps {
  $openMenu: boolean;
  $isHovering: boolean;
}

export const SideBarContainer = styled.aside<SideBarContainerProps>`
  width: ${props =>
    props.$openMenu && !props.$isHovering
      ? "4rem"
      : "15rem"};

  border-right: 1px solid var(--gray-200);
  overflow: hidden;
  transition: width 0.3s ease;

  &:hover {
    max-width: 15rem;
  }
`

export const SideBarHeader = styled.header`
  width: 100%;
  height: 4.5rem;

  padding: 0.5rem;
  border-bottom: 1px solid var(--gray-200);
  
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const SideBarContent = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

export const SideBarItem = styled.div`
  background: var(--white);
  box-shadow: 0 0 4px var(--gray-200);
  border-radius: 6px;

  display: flex;
  flex-direction: column;

  & + div {
    margin-top: 0.5rem;
  }
`;
