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

  max-height: ${({ $subMenu }) => $subMenu ? "30rem" : "0"};
  opacity: ${({ $subMenu }) => $subMenu ? 1 : 0};
  overflow: hidden;

  transition: max-height 0.3s, opacity 0.2s ease;
`;

export const SideBarButton = styled.button<SideBarContentProps>`
  width: 100%;

  padding: 0.6rem 0.5rem;
  border: none;

  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) =>
    $collapsed ? "center" : "space-between"};

  background: ${({ $activeItem }) =>
    $activeItem
      ? "var(--gray-200)"
      : "var(--white)"};

  color: ${({ $activeItem }) =>
    $activeItem
      ? "var(--blue-900)"
      : "var(--gray-500)"};

  font-weight: ${({ $activeItem }) =>
    $activeItem ? "600" : "400"};

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--gray-200);
  }

  .description-item {
    display: flex;
    align-items: center;
    gap: ${({ $collapsed }) => $collapsed ? "0" : "0.5rem"};
    transition: gap 0.2s ease;
  }

  p {
    opacity: ${({ $collapsed }) => $collapsed ? 0 : 1};
    transform: ${({ $collapsed }) =>
    $collapsed
      ? "translateX(-5px)"
      : "translateX(0)"};
    transition: all 0.2s ease;
  }
`;

