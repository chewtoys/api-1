import styled from "styled-components";

const PanelWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 7rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  z-index: 2;
`;

const AppLogo = styled.div`
  width: 5rem;
  height: 5rem;
  border: 3px solid white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  margin: 0.3rem 0;
  background-color: white;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.image});
  box-shadow: 0px 2px 15px -2px hsla(0, 0%, 0%, 0.8);
`;

const Login = styled.svg`
  width: 3.5rem;
  height: 3.5rem;
  background: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  color: ${props => props.theme.mainColor};
  margin: 0.3rem 0;
`;

const Space = styled.div`
  width: 100%;
  flex: 1;
  margin: 0.3rem 0;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
`;

const Item = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  margin-top: 0.7rem;
  box-shadow: 0px 2px 15px -2px hsla(0, 0%, 0%, 0.8);
  display: none;
  position: relative;
  transition: transform 0.3s ease;
  user-select: none;
  border-radius: 1rem;
  &:nth-child(-n + 5) {
    display: flex;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

const Hover = styled.div`
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
  ${Item}:hover & {
    opacity: 1;
  }
`;

const Action = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Asc = styled(Action)`
  right: 0;
  left: 50%;
`;

const Desc = styled(Action)`
  left: 0;
  right: 50%;
`;

const ActionIcon = styled.svg`
  width: 2rem;
  height: 2rem;
  position: absolute;
  pointer-events: none;
  color: white;
  transition: all 0.2s ease;
  filter: drop-shadow(0px 3px 3px hsla(0, 0%, 0%, 0.6));
  ${Action}:hover & {
    transform: scale(1.9);
  }
`;

const Count = styled.div`
  position: absolute;
  top: -0.6rem;
  left: -0.6rem;
  background: white;
  color: black;
  padding: 3px 7px 3px 6px;
  font-size: 10px;
  border-radius: 1rem;
  box-shadow: 0px 2px 15px -2px hsla(0, 0%, 0%, 0.8);
  font-weight: 600;
  transition: all 0.4s ease;
  ${props => {
    if (props.count > 1) {
      return `
        visibility: visible;
        opacity: 1;
        transform: scale(1)
      `;
    } else {
      return `
        visibility: hidden;
        opacity: 0;
        transform: scale(.7)
      `;
    }
  }};
`;

const More = styled.div`
  font-size: 1.2rem;
  color: white;
  font-weight: 900;
  text-shadow: 0 0 8px hsla(0, 0%, 0%, 0.5), 0 0 15px hsla(0, 0%, 0%, 0.4);
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 0.3rem;
  background: hsla(0, 0%, 0%, 0);
  transition: all 0.2s ease;
  :hover {
    background: hsla(0, 0%, 0%, 0.2);
  }
`;

const Cart = styled.div`
  width: 5rem;
  height: 5rem;
  background: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.mainColorDark};
  margin: 0.3rem 0;
  position: relative;
  user-select: none;
  box-shadow: 0px 2px 15px -2px hsla(0, 0%, 0%, 0.8);
  z-index: 2;
  ${props =>
    props.total === 0
      ? `
        ${CartIcon} {
            transform: scale(1);
        }
        ${Total} {
            visibility: hidden;
            transform: scale(.4);
            opacity: 0;
        }
    `
      : `    
        ${CartIcon} {
            transform: scale(.7);
            top: 1.2rem;
        }
    `}
`;

const CartIcon = styled.svg`
  width: 30px;
  height: 30px;
  transition: all 0.1s ease;
  position: relative;
`;

const Total = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 1.3rem;
  justify-content: center;
  align-items: flex-start;
  font-weight: bold;
  visibility: visible;
  transform: scale(1);
  opacity: 1;
  transition: all 0.1s ease;
`;

export const Panel = {
  Wrap: PanelWrap,
  AppLogo: AppLogo,
  Login: Login,
  Space: Space,
  Item: Item,
  Image: Image,
  Hover: Hover,
  Count: Count,
  More: More,
  Cart: Cart,
  CartIcon: CartIcon,
  Total: Total,
  Asc: Asc,
  Desc: Desc,
  ActionIcon: ActionIcon
};

export const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 50vw;
  background: linear-gradient(
    to left,
    hsla(0, 0%, 0%, 0.8) 1%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
  transition: all 1.5s ease;
  ${Space}:not(:empty):hover ~ & {
    opacity: 1;
    visibility: visible;
  }
`;
