import styled from "styled-components";

const ItemWrap = styled.div`
  display: inline-flex;
  position: relative;
  flex-direction: column;
  user-select: none;
`;

const Poster = styled.div`
  width: 100%;
  position: relative;
  transition: transform 0.5s cubic-bezier(0.75, 0, 0.85, 1);
  transform-style: preserve-3d;
  ::before {
    content: "";
    padding-bottom: 100%;
    position: relative;
    display: block;
  }
  & .iron-image__container {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 1.6rem;
    background-color: var(--white);
    & .iron-image {
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 1.6rem;
      background-color: var(--white);
    }
  }
`;

const Input = styled.input`
  display: none;
  :checked ~ ${Poster} {
    transform: rotateY(180deg);
  }
`;

const Inner = styled.div`
  transform: translateZ(50px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  z-index: 10;
`;

const Front = styled.div`
  backface-visibility: hidden;
  border-radius: 1.6rem;
  box-shadow: var(--mainShadow);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const Title = styled.div`
  display: flex;
  margin-top: 10px;
  background: var(--white);
  border-radius: 3rem;
  box-shadow: var(--mainShadow);
  padding: 0.3rem 1rem;
  min-height: 3rem;
  color: var(--black);
  font-size: 1rem;
  flex: 1;
  align-items: center;
  & span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
`;

const Price = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-weight: bold;
  font-size: 1.8rem;
  color: var(--white);
  text-shadow: 0 0 8px hsla(0, 0%, 0%, 0.5), 0 0 15px hsla(0, 0%, 0%, 0.4),
    0 5px 5px hsla(0, 0%, 0%, 0.4);
`;

const Count = styled.div`
  position: absolute;
  top: -13px;
  left: -13px;
  border-radius: 1rem;
  background: var(--white);
  padding: 7px 11px 7px 10px;
  font-size: 13px;
  transition: visibility 0.2s ease;
  font-weight: 600;
  box-shadow: 0px 2px 15px -2px hsla(0, 0%, 0%, 0.8);
  backface-visibility: hidden;
  transition-duration: 0.4s;
  transition-timing-function: ease;
  transition-property: transform, opacity, visibility;
  visibility: ${props => (props.count === 0 ? `hidden` : `visible`)};
  transform: ${props => (props.count === 0 ? `scale(.7)` : `scale(1)`)};
  opacity: ${props => (props.count === 0 ? 0 : 1)};
  color: ${props => (props.count === 0 ? `transparent` : `var(--red)`)};
`;

const Info = styled.svg`
  position: absolute;
  bottom: 1rem;
  width: 45px;
  height: 45px;
  left: 1rem;
  border: 2px solid var(--white);
  border-radius: 50%;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
  transition: opacity 1s ease;
  filter: drop-shadow(0px 3px 2px hsla(0, 0%, 0%, 0.8));
  padding: 5px;
  ${ItemWrap}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const Back = styled.div`
  backface-visibility: hidden;
  border-radius: 1.6rem;
  box-shadow: var(--mainShadow);
  background: var(--white);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: hsl(0, 0%, 30%);
  text-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);
`;

const Mass = styled.div`
  font-size: 3rem;
  font-weight: 600;
  line-height: 3rem;
`;

const Energy = styled.div`
  font-size: 2rem;
  font-weight: 400;
  line-height: 2rem;
`;

const EnergyValues = styled.div`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5rem;
`;

const Pay = styled.div`
  background: linear-gradient(
    45deg,
    hsl(199, 75%, 56%) 0%,
    hsl(230, 74%, 62%) 25%,
    hsl(284, 46%, 49%) 51%,
    hsl(338, 100%, 60%) 100%
  );
  position: absolute;
  bottom: 1.5rem;
  right: 1rem;
  color: var(--white);
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  box-shadow: 0px 2px 15px -2px hsla(0, 0%, 0%, 0.8);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  line-height: 10px;
  user-select: none;
  transform: scale(0.8);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.4s ease, opacity 0.3s ease;
  & svg {
    width: 20px;
    height: 20px;
  }
  ${ItemWrap}:hover & {
    transform: scale(1);
    opacity: 1;
    visibility: visible;
    &:active {
      transform: scale(0.8);
    }
  }
`;

const Close = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 3rem;
  height: 3rem;
  left: 1rem;
  border: 2px solid var(--white);
  border-radius: 50%;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  backface-visibility: hidden;
  filter: drop-shadow(0px 3px 2px hsla(0, 0%, 0%, 0.8));
  & svg {
    width: 30px;
    height: 30px;
  }
`;

const Spicy = styled.svg`
  width: 3rem;
  height: 3rem;
  padding: 0.1rem;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  z-index: 10;
  filter: drop-shadow(0px 3px 3px hsla(0, 0%, 0%, 0.6));
  color: #ff5722;
`;

export const Item = {
  Wrap: ItemWrap,
  Poster: Poster,
  Inner: Inner,
  Input: Input,
  Front: Front,
  Back: Back,
  Title: Title,
  Price: Price,
  Count: Count,
  Info: Info,
  Close: Close,
  Pay: Pay,
  Spicy: Spicy,
  Values: {
    Mass: Mass,
    Energy: Energy,
    EnergyValues: EnergyValues
  }
};
