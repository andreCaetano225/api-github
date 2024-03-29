import {createGlobalStyle} from 'styled-components';

import ImgBack from '../assets/background.svg';

export const GlobalStyle = createGlobalStyle`

  *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }

  html {
      @media (max-width: 1080px) {
          font-size: 93.75%;
      }

      @media (max-width: 1080px) {

         font-size: 87.5%;

      }
  }

  body{
      background: #8e44ad url(${ImgBack}) no-repeat 70% top;
      -webkit-font-smoothing: antialiased;

  }

  #root{
      max-width: 960px;
      margin: 0 auto;
      padding: 2.5rem 1.25rem;
  }

  body, input, select, button {
      font: 400 1rem "Roboto", sans-serif;
  } 
 
  button{
      cursor: pointer;
  }

  a{
      color: inherit;
      text-decoration: none;
  }

`;