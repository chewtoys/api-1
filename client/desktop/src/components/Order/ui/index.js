// import React from "react";
import styled from "styled-components";
import Scroll from "react-scrollbar";

const WrapOrder = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 39rem;
  background: white;
  border-radius: 1.6rem 1.6rem 0 0;
  box-shadow: 0px -2px 10px -1px hsla(0, 0%, 0%, 0.5);
  z-index: 10000;
  bottom: ${props => (props.isActive ? `0` : `-35rem`)};
  transition: bottom 0.3s ease;
  ${props =>
    !props.isActive
      ? `      
        ${Arrow} {
            transform: rotate(180deg);
        }
    `
      : ``};
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  display: flex;
  height: 4rem;
  justify-content: space-between;
  color: hsl(0, 0%, 16%);
  padding: 1rem;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
  cursor: pointer;
`;

const Arrow = styled.svg`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: -0.2rem;
  transition: all 0.2s ease;
`;

const OrderScrollArea = styled(Scroll)`
  height: calc(100% - 4rem);
  padding: 0;
`;

const NextButton = styled.div`
  margin: 1rem;
  padding: 1rem 2rem;
  border-radius: 2rem;
  background: ${props => props.theme.mainColor};
  color: white;
  display: inline-flex;
  cursor: pointer;
`;

export const Ordering = {
  Wrap: WrapOrder,
  Title,
  Arrow,
  Content: OrderScrollArea,
  NextButton
};
