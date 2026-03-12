"use client";

import styled from "styled-components";

export const CostCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h4 { 
    color: var(--gray-500);
  }
`;

export const CostCenterContent = styled.div`
  form {
    width: 100%;
    padding: 0.25rem;

    display: flex;
    gap: 1rem;
    
    input {
      flex: 1;

      padding: 0.5rem;

      background: var(--white);
      border: none;
      border-radius: 6px;
      box-shadow: 0 0 4px var(--blue-900);

      &:focus {
        box-shadow: 0 0 4px 1px var(--blue-900);
      }
    }

    button {
      padding: 0.25rem 0.5rem;
      border: none;
      border-radius: 6px;
      color: var(--white);
      font-weight: 700;
      background: var(--green-300);
      box-shadow: 0 0 4px var(--green-500);

      &:hover {
        background: var(--green-500);
        transition: background-color 0.3s;
      }
    }
  }
`;