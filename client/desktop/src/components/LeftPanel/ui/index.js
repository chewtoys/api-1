import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const navTitleAnimation = keyframes`
    0% {
        visibility: visible;
        width: 30px;
        color: transparent;
    }
    25% {
        width: auto;
        color: var(--black);
    }
    26% {
        color: var(--black);
    }
    100% {
        visibility: visible;
        width: auto;
        color: var(--black);
    }
`;

export const Panel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 7rem;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const NavBar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  top: calc(50vh - 300px);
`;

export const NavLink = styled(Link)`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  display: inline-flex;
  margin: 0.7rem 0;
  position: relative;
  z-index: 2;
  border-radius: 50%;
  background: hsla(0, 0%, 100%, 1);
  transition: trabsform 0.4s ease;
  text-decoration: none;
  align-items: center;
  ${props =>
    props.selected
      ? `
        transform: scale(1.8);
        ${Title} {
            display: none;
        }
    `
      : ""};
  :first-child {
    margin-top: 0;
  }
  :nth-last-child(2) {
    margin-bottom: 0;
  }
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 50vw;
  background: linear-gradient(
    to right,
    hsla(0, 0%, 0%, 0.8) 1%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: all 1.5s ease;
  ${NavBar}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

export const Title = styled.div`
  white-space: nowrap;
  background: hsla(0, 0%, 100%, 1);
  padding: 0.2rem 0.7rem;
  border-radius: 1rem;
  visibility: hidden;
  margin-left: 2rem;
  transform: initial;
  ${NavBar}:hover & {
    animation-duration: 0.3s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    animation-name: ${navTitleAnimation};
  }
`;
