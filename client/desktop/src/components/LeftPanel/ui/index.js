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
`;

const NavWrap = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  top: calc(50vh - 300px);
  width: 100%;
`;

const NavItem = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: hsla(0, 0%, 100%, 1);
  background-image: url(${props => props.bgImage});
  background-size: cover;
  text-decoration: none;
`;

const NavLink = styled(Link)`
  padding: 0.5rem 0;
  display: inline-flex;
  transition: transform 0.2s ease;
  transform: ${props => (props.selected ? "scale(1.3)" : "scale(1)")};
  position: relative;
  z-index: 2;
  :first-child {
    padding-top: 0;
  }
  :nth-last-child(2) {
    padding-bottom: 0;
  }
`;

export const Nav = {
  Wrap: NavWrap,
  Link: NavLink,
  Item: NavItem
};

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 50vw;
  background: linear-gradient(
    to right,
    hsla(0, 0%, 0%, 0.95) 1%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: all 1.5s ease;
  ${NavWrap}:hover & {
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
  display: none;
  ${NavWrap}:hover & {
    animation-duration: 0.3s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    animation-name: ${navTitleAnimation};
  }
`;
