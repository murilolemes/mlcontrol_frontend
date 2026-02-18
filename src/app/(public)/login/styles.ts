"use client";

import styled from "styled-components";

export const LoginContainer = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginContent = styled.div`
  width: 450px;
  
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;


  div {
    padding: 0.25rem;

    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
      font-weight: bold;
      color: var(--blue-900);
    }

    input {
      padding: 1rem;

      background: var(--white);
      border: none;
      border-radius: 6px;
      box-shadow: 0 0 4px var(--blue-900);
      margin-bottom: 0.5rem;

      &:focus {
        box-shadow: 0 0 4px 1px var(--blue-900);
      }
    }

    small {
      color: var(--red-300);
      font-size: var(--font-sm);
    }
  }

  button {
    background: var(--blue-900);
    color: var(--white);
    font-weight: bold;
    padding: 1rem;
    margin-top: 0.5rem;

    border: none;
    border-radius: 6px;
    box-shadow: 0 0 4px var(--blue-700);

    &:hover {
      background: var(--blue-700);
      box-shadow: 0 0 2px 1px var(--blue-700);
      transition: 0.2s;
    }
  }
`;