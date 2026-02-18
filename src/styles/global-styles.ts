"use client";

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --white: #FFFFFF;
    
    --gray-100: #EEEEEE;
    --gray-300: #787A91;
    --gray-500: #585A92;

    --blue-500: #141e61;
    --blue-700: #14056b;
    --blue-900: #0f044c;

    --green-300: #00bd0d;
    --green-500: #008e09;

    --red-300: #ff0004;
    --red-500: #bf0003;

    --font-lg: 1rem;
    --font-md: 0.875rem;
    --font-sm: 0.75rem;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    overflow: auto;
    scrollbar-width: 1px;

    ::-webkit-scrollbar-track {
      background-color: var(--gray-500);
    }

    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background: var(--blue-500);
    }

    ::-webkit-scrollbar-thumb {
      width: 50%;
      background: var(--gray-300);
      border-radius: 10px;
    }
  }

  body {
    font-family: var(--font-montserrat), sans-serif;
    color: var(--text);
    
    background: var(--gray-100);
    
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .Toastify * {
    overflow: hidden;
  }
`;
