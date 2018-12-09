import styled from "styled-components";
import Scroll from "react-scrollbar";
import kosmo from "../img/kosmo.jpg";

const CartWrap = styled.div`
  position: fixed;
  right: 7rem;
  width: 45rem;
  height: 42rem;
  background: white;
  border-radius: 1.6rem 1.6rem 0 0;
  box-shadow: 0px -2px 10px -1px hsla(0, 0%, 0%, 0.5);
  bottom: ${props => (props.isOpen ? `0` : `calc(-100vh - 1rem)`)};
  transition: bottom 0.3s ease;
  z-index: 2;
`;

const CartTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  display: flex;
  height: 4rem;
  justify-content: space-between;
  color: hsl(0, 0%, 16%);
  padding: 1rem;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
`;

const CartClose = styled.svg`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const CartHeader = styled.div`
  background-image: url(${kosmo});
  background-size: cover;
  height: 6rem;
  margin: 1rem;
  border-radius: 1rem;
`;

const CartContent = styled.div`
  display: grid;
  padding: 1rem 1rem 1.5rem;
  grid-template-columns: repeat(auto-fill, 23%);
  justify-content: space-between;
  grid-gap: 1rem 1rem;
  position: relative;
`;

export const Cart = {
  Wrap: CartWrap,
  Title: CartTitle,
  Header: CartHeader,
  Close: CartClose,
  Content: CartContent
};

export const ScrollArea = styled(Scroll)`
  height: calc(100% - 7rem);
  padding: 0;
`;

const ItemWrap = styled.div`
  position: relative;
  user-select: none;
  :hover {
    &:not([data-count="1"]) {
      &::before {
        top: -2px;
      }
    }
    ::after {
      box-shadow: 0px 0px 5px hsla(0, 0%, 0%, 0.3);
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
        background-image: url(${kosmo});
        background-size: cover;
        background-position: center;
        box-shadow: 0px 2px 15px -2px hsla(0,0%,0%,0.8);
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
    `}
  ::after {
    content: "";
    padding-bottom: 100%;
    position: relative;
    display: block;
    background-image: url(${props => props.bgImage});
    background-size: cover;
    background-position: center;
    border-radius: 1rem;
    box-shadow: 0px 2px 5px hsla(0, 0%, 0%, 0.5);
    transition: box-shadow 0.3s ease;
  }
`;

const ItemHover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsla(0, 0%, 0%, 0.2);
  z-index: 5;
  border-radius: 1rem;
  opacity: 0.2;
  transition: opacity 0.3s ease;
  ${ItemWrap}:hover & {
    opacity: 1;
  }
`;

const Count = styled.div`
  position: absolute;
  top: -15px;
  left: -12px;
  color: white;
  background: ${props => props.theme.mainColor};
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

const Action = styled.div`
  position: absolute;
  top: 0;
  /* width: 50%; */
  bottom: 0;
  z-index: 5;
  color: white;
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

const Asc = styled(Action)`
  border-radius: 0 1rem 1rem 0;
  left: 50%;
  right: 0;
  background: linear-gradient(
    to left,
    hsla(0, 0%, 0%, 0.3) 1%,
    hsla(0, 0%, 0%, 0) 100%
  );
`;

const Desc = styled(Action)`
  border-radius: 1rem 0 0 1rem;
  right: 50%;
  left: 0;
  background: linear-gradient(
    to right,
    hsla(0, 0%, 0%, 0.3) 1%,
    hsla(0, 0%, 0%, 0) 100%
  );
`;

const Price = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
  font-size: 1.3rem;
  color: white;
  z-index: 10;
  text-shadow: 0 0 10px hsla(0, 0%, 0%, 0.4), 0 3px 5px hsla(0, 0%, 0%, 0.4);
  pointer-events: none;
`;

const Spacy = styled.svg`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 10;
  filter: drop-shadow(0px 2px 1px hsla(0, 0%, 0%, 0.5));
  color: hsl(4, 90%, 58%);
  pointer-events: none;
`;

const Icon = styled.svg`
  width: 6rem;
  height: 6rem;
  color: white;
  filter: drop-shadow(0px 2px 1px hsla(0, 0%, 0%, 0.5));
`;

export const Item = {
  Wrap: ItemWrap,
  Hover: ItemHover,
  Count: Count,
  Asc: Asc,
  Desc: Desc,
  Price: Price,
  Spacy: Spacy,
  Icon: Icon
};
