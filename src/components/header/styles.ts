"use client";

import styled from "styled-components";

interface UserProfileProps {
  $isActive: boolean;
}

export const HeaderContainer = styled.header`
  width: 100%;
  height: 4.5rem;
  
  padding: 0.5rem;
  border-bottom: 1px solid var(--gray-200);

  display: flex;
  align-items: center;
`

export const HeaderContent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    color: var(--blue-900);
  }
`;

export const ButtonMenu = styled.button`
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: var(--blue-900);
  }
`;

export const UserInfo = styled.div`
  height: 100%;
  padding: 0.5rem;

  position: relative;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    font-size: var(--font-sm);
    color: var(--gray-300);
    span {
      font-weight: bold;
    }
  }
`;

export const UserAvatar = styled.button`
  width: 2rem;
  height: 2rem;

  background: var(--white);
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 4px 2px var(--gray-200);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserProfile = styled.div<UserProfileProps>`
  width: 10rem;
  max-height: ${({ $isActive }) => $isActive ? "auto" : "0"};

  padding: 0.5rem;
  box-shadow: 0 0 4px 2px var(--gray-200);
  border-radius: 6px;
  background: var(--white);
  
  opacity: ${({ $isActive }) => $isActive ? 1 : 0};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.2s ease;
  
  position: fixed;
  right: 16px;
  top: 60px;
  
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    width: ${({ $isActive }) => $isActive ? "10px" : "0"};
    height: ${({ $isActive }) => $isActive ? "10px" : "0"};
    
    background: var(--white);
    transform: rotate(45deg);

    position: fixed;
    top: 56px;
    right: 26px;
  }

  .itens {
    button {
      width: 100%;
      border: none;
      padding: 0.25rem;

      background: transparent;
      color: var(--gray-300);
  
      display: flex;
      align-items: center;
      justify-content: center;
  
      & + button {
        border-top: 1px solid var(--gray-100);
        padding-top: 0.5rem;
      }
  
      &:hover {
        background: var(--gray-100);
        border-radius: 6px;
        font-weight: 700;
        transition: background-color 0.3s ease, font-weight 0.3;
      }
    }
  }
`