"use client";

import styled from "styled-components";

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

export const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  background: var(--white);
  border-radius: 50%;
  box-shadow: 0 0 4px 2px var(--gray-200);

  display: flex;
  align-items: center;
  justify-content: center;
`;