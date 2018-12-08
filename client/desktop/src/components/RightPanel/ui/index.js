import styled from "styled-components";

export const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 7rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  z-index: 2;
`;

export const Logo = styled.div`
  width: 5rem;
  height: 5rem;
  border: 3px solid var(--white);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  margin: 5px 0;
  background-color: hsl(0, 0%, 100%);
  background-size: cover;
  background-position: center;
  background-image: ${props => props.image};
`;

export const Login = styled.svg`
  width: 3.5rem;
  height: 3.5rem;
  background: hsl(0, 0%, 100%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  color: ${props => props.theme.mainColorBackground};
  margin: 5px 0;
  /* & svg {
      width: 40px;
      height: 40px;
    } */
`;

export const Space = styled.div`
  width: 100%;
  flex: 1;
  margin: 5px 0;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: center;
`;

export const Item = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  margin-top: 10px;
  box-shadow: var(--mainShadow);
  animation-duration: 0.3s;
  animation-name: cartMainItem;
  display: none;
  position: relative;
  transition: transform 0.3s ease;
  user-select: none;
  border-radius: 1rem;
  &[data-count="1"] .cart-mini--item--count {
    visibility: hidden;
    opacity: 0;
    transform: scale(0.7);
  }
  &:nth-child(-n + 5) {
    display: flex;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

export const Remove = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsla(0, 0%, 0%, 0.5);
  border-radius: 1rem;
  opacity: 0;
  transition: all 0.4s ease;
  cursor: pointer;
  & svg {
    width: 70%;
    height: 100%;
    transition: all 0.4s ease;
    filter: drop-shadow(0px 3px 2px hsla(0, 0%, 0%, 0.8));
    transform: scale(0.7);
  }
  ${Item}:hover & {
    opacity: 1;
    & svg {
      transform: scale(1);
    }
  }
`;

export const Count = styled.div`
  position: absolute;
  top: -8px;
  left: -8px;
  background: var(--white);
  color: ${props => props.theme.mainColorBackground};
  padding: 3px 7px 3px 6px;
  font-size: 10px;
  border-radius: 15px;
  box-shadow: 0px 2px 15px -2px hsla(0, 0%, 0%, 0.8);
  font-weight: 600;
  transition: all 0.4s ease;
  ${props =>
    props.count > 1
      ? `
        visibility: visible;
        opacity: 1;
        transform: scale(1);
    `
      : `
        visibility: hidden;
        opacity: 0;
        transform: scale(.7);
    `};
`;

export const More = styled.div`
  font-size: 17px;
  color: var(--white);
  font-weight: 900;
`;

export const Cart = styled.div`
  width: 5rem;
  height: 5rem;
  background: hsl(0, 0%, 100%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  color: ${props => props.theme.mainColorBackground};
  margin: 5px 0;
  position: relative;
  user-select: none;
  & svg {
    width: 30px;
    height: 30px;
    transition: all 0.1s ease;
  }
  ${props =>
    props.total === 0
      ? `
        & svg {
            visibility: visible;
            opacity: 1;
            transform: scale(1);
        }
        ${Total} {
            visibility: hidden;
            transform: scale(.4);
            opacity: 0;
        }
    `
      : `    
        & svg {
            visibility: hidden;
            transform: scale(.4);
            opacity: 0;
        }
    `}
`;

export const Total = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  visibility: visible;
  transform: scale(1);
  opacity: 1;
  transition: all 0.1s ease;
`;
