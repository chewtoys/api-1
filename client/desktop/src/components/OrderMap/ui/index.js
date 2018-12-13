import styled from "styled-components";
import { Map } from "react-yandex-maps";

const MyMap = styled(Map)`
  position: relative;
  height: 15rem;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: hsla(0, 0%, 0%, 0.3);
  z-index: 10;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const Point = styled.svg`
  filter: drop-shadow(0px 3px 3px hsla(0, 0%, 0%, 0.6));
  width: 5rem;
  height: 5rem;
  align-self: center;
  transform: translateY(-2.5rem);
`;

const DisplayAddress = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  text-shadow: 0 0 6px hsla(0, 0%, 0%, 0.5), 0 0 12px hsla(0, 0%, 0%, 0.4),
    0 3px 5px hsla(0, 0%, 0%, 0.4);
`;

const DisplayLocality = styled.div`
  font-size: 1rem;
`;

const DisplayStreet = styled.div`
  font-size: 1.5rem;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Zoom = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  background: hsla(0, 0%, 100%, 0.5);
  border-radius: 50%;
  /* padding: 0.2rem; */
  margin: 0 0.2rem;
  box-shadow: 0 2px 5px hsla(0, 0%, 0%, 0.5);
  color: hsla(0, 0%, 0%, 0.4);
  pointer-events: all;
  cursor: pointer;
`;

const FindMe = styled.svg`
  width: 2.3rem;
  height: 2.3rem;
  background: hsla(0, 0%, 100%, 0.5);
  border-radius: 50%;
  padding: 0.1rem;
  margin: 0 0.2rem;
  box-shadow: 0 2px 5px hsla(0, 0%, 0%, 0.5);
  color: hsla(0, 0%, 0%, 0.4);
  pointer-events: all;
  cursor: pointer;
`;

export const Maps = {
  Ymaps: MyMap,
  Background: Background,
  Point: Point,
  DisplayAddress: DisplayAddress,
  DisplayLocality: DisplayLocality,
  DisplayStreet: DisplayStreet,
  Controls: Controls,
  Zoom: Zoom,
  FindMe: FindMe
};
