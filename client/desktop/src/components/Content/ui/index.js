import styled from "styled-components";

export const WrapContent = styled.div`
  display: grid;
  padding: 6rem 7rem 1rem 7rem;
  grid-template-columns: repeat(auto-fill, 23%);
  justify-content: space-between;
  grid-gap: 2rem 1rem;
  position: relative;
  ${props => (props.open ? `filter: blur(3px)` : ``)};
`;

export const Title = styled.h1`
  position: absolute;
  top: 1rem;
  left: 7rem;
  font-weight: bold;
  margin: 0;
  font-size: 40px;
  color: hsla(0, 0%, 100%, 1);
  text-shadow: 0 2px 10px hsla(0, 0%, 0%, 0.4);
`;
