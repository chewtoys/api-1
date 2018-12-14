import styled, { createGlobalStyle } from "styled-components";
import ScrollArea from "react-scrollbar";

export const GlobalStyle = createGlobalStyle`
    html {
        font-size: 15px;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: "Roboto";
        background: ${props => props.theme.mainColor};
        color: black;
        transition: background .2s ease;
        overflow: hidden;
    }
    * {
        box-sizing: border-box;
        -webkit-font-smoothing: none;
    }
    a {
        outline: none; 
    }
    h1 {
        font-family: "Roboto"
    }
    .scrollbar {
        border-radius: .3rem;
    }
    .scroll-main--block {
        width: 100vw;
        height: 100vh;
    }
    .scrollarea .scrollbar-container:hover {
        background: hsla(0, 0%, 0%, .3) !important;
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
