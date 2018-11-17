import styled, { createGlobalStyle } from "styled-components";
import ScrollArea from "react-scrollbar";

export const GlobalStyle = createGlobalStyle`
    :root {
        --mainColor: ${props =>
          props.mainColor ? props.mainColor : "hsla(0, 0%, 90%, 1)"};
        --white: hsla(0, 0%, 100%, 1);
        --black: hsla(0, 0%, 0%, 1);
        --green: hsla(122, 39%, 49%, 1);
        --red: hsl(358, 91%, 34%);
        --fontName: "Roboto";
        --mainShadow: 0px 2px 10px -1px rgba(0, 0, 0, .4);
    }
    html {
        font-size: 15px;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: var(--fontName);
        background: var(--mainColor);
        transition: background .2s ease;
        overflow: hidden;
    }
    * {
        box-sizing: border-box;
        -moz-box-sizing: content-box;
        -ms-box-sizing: content-box;
    }
    a {
        outline: none; 
    }
    h1 {
        font-family: var(--fontName)
    }
    .scrollbar {
        border-radius: 5px;
    }
    .scroll-main--block {
        width: 100vw;
        height: 100vh;
    }
`;

export const Scroll = styled(ScrollArea)`
  width: 100vw;
  height: 100vh;
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: hsla(0, 0%, 0%, 0.75);
  z-index: 1;
`;
