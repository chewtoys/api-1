import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --mainColor: ${props => props.mainColor ? props.mainColor : "hsla(0, 0%, 90%, 1)"};
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