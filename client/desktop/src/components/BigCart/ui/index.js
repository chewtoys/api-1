import React from "react";
import styled, { css } from "styled-components";
import Scroll from "react-scrollbar";
import { IMaskInput } from "react-imask";
import { Map } from "react-yandex-maps";

export const Cart = styled.div`
  position: fixed;
  right: 7rem;
  width: 45rem;
  height: 42rem;
  background: var(--white);
  border-radius: 1.6rem 1.6rem 0 0;
  box-shadow: var(--mainShadow);
  bottom: ${props => (props.isOpen ? `0` : `calc(-100vh - 1rem)`)};
  transition: bottom 0.3s ease;
  z-index: 2;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  display: flex;
  height: 4rem;
  justify-content: space-between;
  color: hsl(0, 0%, 16%);
  padding: 1rem;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
`;

export const Close = styled.svg`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

export const ScrollArea = styled(Scroll)`
  height: calc(100% - 7rem);
  padding: 0;
  & > div:first-child {
    display: grid;
    padding: 1rem 1rem 1.5rem;
    grid-template-columns: repeat(auto-fill, 23%);
    justify-content: space-between;
    grid-gap: 1rem 1rem;
    position: relative;
  }
`;

export const Item = styled.div`
  position: relative;
  user-select: none;
  :hover {
    &:not([data-count="1"]) {
      &::before {
        top: -2px;
      }
    }
  }
  ${props =>
    props.count > 1
      ? `
    ::before {
        content: "";
        height: 1rem;
        width: 80%;
        border-radius: 1rem 1rem 0 0;
        position: absolute;
        display: block;
        top: -4px;
        left: 10%;
        background: hsl(32, 55%, 71%);
        box-shadow: var(--mainShadow);
        transition: top .3s ease;
    }
    `
      : `    
    ${Count} {
        visibility: hidden;
        transform: scale(.7);
        opacity: 0;
        color: transparent;
    }
    `} ::after {
    content: "";
    padding-bottom: 100%;
    position: relative;
    display: block;
  }
`;

export const Image = styled.img`
  position: absolute;
  border-radius: 1rem;
  box-shadow: 0px 6px 15px 0px hsla(0, 0%, 0%, 0.5);
  transition: box-shadow 0.3s ease;
  width: 100%;
  height: 100%;
  ${Item}:hover & {
    box-shadow: 0px 8px 15px 0px hsla(0, 0%, 0%, 0.5);
  }
`;

export const ItemHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsla(0, 0%, 0%, 0.2);
  z-index: 5;
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  ${Item}:hover & {
    opacity: 1;
  }
`;

export const Count = styled.div`
  position: absolute;
  top: -15px;
  left: -12px;
  color: var(--white);
  background: var(--mainColor);
  padding: 7px 11px 7px 10px;
  font-size: 13px;
  border-radius: 1rem;
  box-shadow: 0px 2px 10px -2px hsla(0, 0%, 0%, 0.5);
  font-weight: 600;
  visibility: visible;
  opacity: 1;
  transform: scale(1);
  transition: all 0.4s ease;
  transition-duration: 0.4s;
  transition-timing-function: ease;
  transition-property: transform, opacity, visibility;
  z-index: 10;
`;

export const Action = styled.div`
  position: absolute;
  top: 0;
  /* width: 50%; */
  bottom: 0;
  z-index: 5;
  color: var(--white);
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-shadow: 0 0 10px hsla(0, 0%, 0%, 0.4), 0 3px 5px hsla(0, 0%, 0%, 0.4);
  font-weight: 600;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  :hover {
    opacity: 1;
  }
`;

export const Add = styled(Action)`
  border-radius: 1rem 0 0 1rem;
  left: 0;
  right: 50%;
  background: linear-gradient(
    to right,
    hsla(0, 0%, 0%, 0.3) 1%,
    hsla(0, 0%, 0%, 0) 100%
  );
`;

export const Remove = styled(Action)`
  border-radius: 0 1rem 1rem 0;
  right: 0;
  left: 50%;
  background: linear-gradient(
    to left,
    hsla(0, 0%, 0%, 0.3) 1%,
    hsla(0, 0%, 0%, 0) 100%
  );
`;

export const Price = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  font-size: 1.3rem;
  color: var(--white);
  z-index: 10;
  text-shadow: 0 0 10px hsla(0, 0%, 0%, 0.4), 0 3px 5px hsla(0, 0%, 0%, 0.4);
  pointer-events: none;
`;

export const Spacy = styled.div`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 10;
  filter: drop-shadow(0px 2px 1px hsla(0, 0%, 0%, 0.5));
  color: hsl(4, 90%, 58%);
  pointer-events: none;
  & svg {
    width: 2rem;
    height: 2rem;
  }
`;
