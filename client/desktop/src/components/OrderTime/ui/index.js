import styled from "styled-components";
// IMG
import kosmo from "../img/kosmo.jpg";

const Title = styled.div`
  padding: 0 1rem 1rem;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.3rem;
  width: 100%;
  color: hsla(0, 0%, 100%, 0.8);
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.3);
  z-index: 2;
  display: flex;
  flex-direction: column;
  span {
    font-size: 0.7rem;
  }
`;

const Wrap = styled.div`
  display: flex;
  /* margin: 0 1rem 1rem; */
  padding: 1rem 2rem 0.5rem;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background-image: url(${kosmo});
  background-size: cover;
  background-position: center;
  /* border-radius: 2rem; */
  position: relative;
  text-shadow: 0 0 6px hsla(0, 0%, 0%, 0.5), 0 3px 5px hsla(0, 0%, 0%, 0.4);
  ::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: hsla(0, 0%, 0%, 0.5);
    z-index: 1;
  }
`;

const Item = styled.div`
  padding: 1rem 2rem;
  border-radius: 2rem;
  border: 1px solid hsla(0, 0%, 100%, 0.8);
  color: hsla(0, 0%, 100%, 0.8);
  line-height: 1;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  z-index: 2;
  ${props =>
    props.select
      ? `background: hsla(0, 0%, 100%, 0.2); color: white; border-color: white`
      : `background: transparent`};
`;

export const Block = {
  Wrap,
  Title,
  Item
};
