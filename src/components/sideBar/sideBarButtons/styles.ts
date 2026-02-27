"use client";

import styled from "styled-components";

interface SideBarContentProps {
  $openMenu?: boolean;
  $activeItem?: boolean;
  $subMenu?: boolean;
  $collapsed: boolean;
}

export const SideBarSubItem = styled.div<SideBarContentProps>`
  width: 100%;

  max-height: ${props => props.$subMenu ? "10rem" : "0"};
  opacity: ${props => props.$subMenu ? 1 : 0};
  overflow: hidden;

  transition: max-height 0.3s, opacity 0.2s ease;
`;

export const SideBarButton = styled.button<SideBarContentProps>`
  width: 100%;

  padding: 0.6rem 0.5rem;
  border: none;

  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.$collapsed ? "center" : "space-between"};

  background: ${props =>
    props.$activeItem
      ? "var(--gray-200)"
      : "var(--white)"};

  color: ${props =>
    props.$activeItem
      ? "var(--blue-900)"
      : "var(--gray-500)"};

  font-weight: ${props =>
    props.$activeItem ? "600" : "400"};

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--gray-200);
  }

  .description-item {
    display: flex;
    align-items: center;
    gap: ${props => props.$collapsed ? "0" : "0.5rem"};
    transition: gap 0.2s ease;
  }

  p {
    opacity: ${props => props.$collapsed ? 0 : 1};
    transform: ${props =>
    props.$collapsed
      ? "translateX(-5px)"
      : "translateX(0)"};
    transition: all 0.2s ease;
  }
`;

