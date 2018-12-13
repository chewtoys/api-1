// import React from "react";
import styled, { css } from "styled-components";
import Scroll from "react-scrollbar";
import { IMaskInput } from "react-imask";
import { Map } from "react-yandex-maps";

export const WrapOrder = styled.div`
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

export const Title = styled.div`
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

export const Arrow = styled.svg`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: -0.2rem;
  transition: all 0.2s ease;
`;

export const OrderScrollArea = styled(Scroll)`
  height: calc(100% - 4rem);
  padding: 0;
`;

export const NameBlock = styled.h3`
  color: hsl(0, 0%, 16%);
`;

const BlockCSS = css`
  padding-bottom: 1rem;
  display: grid;
  grid-gap: 1rem;
  font-size: 0.8rem;
`;

const BlockAddress = styled.div`
  ${BlockCSS};
  grid-template:
    "address address address" 4rem
    "entrance apartment domofon" 4rem
    "comment comment comment" 4rem;
`;

const BlockContacts = styled.div`
  ${BlockCSS};
  grid-template: "number email name" 4.5rem;
`;

const BlockTime = styled.div`
  ${BlockCSS};
  grid-template: "time time time" 2rem;
`;

export const Block = {
  Address: BlockAddress,
  Contacts: BlockContacts,
  Time: BlockTime
};

const MyMap = styled(Map)`
  grid-area: map;
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: hsla(0, 0%, 0%, 0.2);
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

const InputStyle = css`
  border: 1px solid hsla(0, 0%, 0%, 0.3);
  width: 100%;
  padding: 1rem;
  margin-top: 0.2rem;
  outline: none;
  transition: border 0.2s ease;
  border-radius: 0.1rem;
  font: inherit;

  :focus {
    border-color: hsla(0, 0%, 0%, 0.6);
  }
  ::placeholder {
    color: hsla(0, 0%, 0%, 0.4);
  }
`;

const Label = styled.div`
  color: hsla(0, 0%, 0%, 1);
  display: block;
  font-size: 1rem;
`;

const InputWrap = styled.div`
  position: relative;
  grid-area: ${props => props.type};
`;

const InputNumber = styled(IMaskInput)`
  ${InputStyle};
  padding-left: 1.6rem;
`;

const Plus = styled.span`
  color: hsla(0, 0%, 0%, 0.4);
  position: absolute;
  bottom: 1.1rem;
  left: 1rem;
  ${InputNumber}:focus + & {
    color: hsla(0, 0%, 0%, 0.7);
  }
`;

const InputAll = styled.input`
  ${InputStyle};
`;

export const Input = {
  Input: InputAll,
  Wrap: InputWrap,
  Label: Label,
  Plus: Plus,
  InputNumber: InputNumber
};

export const TimeButton = styled.div`
  /* font-weight: 600; */
  /* font-size: 1.1rem; */
  display: inline-block;
  margin-left: 0.3rem;
  border-bottom: 1px solid hsla(220, 100%, 50%, 0.3);
  color: hsla(220, 100%, 50%, 1);
`;

export const TimeSelect = styled.div`
  color: hsla(0, 0%, 0%, 1);
  text-decoration: underline transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  :hover {
    color: hsla(220, 100%, 50%, 1);
    text-decoration: underline hsla(220, 100%, 50%, 0.5);
  }
`;

const SuggestWrap = styled.div`
  ${props => (props.focus ? `display: flex` : `display: none`)};
  position: absolute;
  top: 4.8rem;
  left: 0.3rem;
  right: 0.3rem;
  background: white;
  border-radius: 1rem;
  flex-direction: column;
  z-index: 2;
  box-shadow: 0 2px 10px hsla(0, 0%, 0%, 0.5);
`;

const SuggestItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  :hover {
    background: hsla(0, 0%, 0%, 0.06);
  }
  :first-child {
    border-radius: 1rem 1rem 0 0;
  }
  :last-child {
    border-radius: 0 0 1rem 1re;
  }
`;

export const Suggest = {
  Wrap: SuggestWrap,
  Item: SuggestItem
};

const ConfirmButton = styled.div`
  ${props => (props.visible ? "display: flex" : "display: none")};
  position: absolute;
  /* top: 1rem; */
  right: 0.6rem;
  bottom: 0.6rem;
  width: 6rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: hsla(0, 0%, 0%, 0.6);
  /* color: white; */
  background: hsla(0, 0%, 0%, 0.1);
  /* background: linear-gradient(
    45deg,
    hsl(199, 75%, 56%) 0%,
    hsl(230, 74%, 62%) 25%,
    hsl(284, 46%, 49%) 51%,
    hsl(338, 100%, 60%) 100%
  ); */
  cursor: pointer;
`;

const ConfirmInput = styled.input`
  position: absolute;
  /* top: 1rem; */
  right: 0.6rem;
  bottom: 0.6rem;
  width: 6rem;
  height: 2rem;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  /* color: white; */
  padding: 0 1rem;
  outline: none;
  text-align: center;
  ${props =>
    props.verify
      ? "border: 1px solid hsla(0, 0%, 0%, 0.3);"
      : "border: 1px solid hsla(349, 100%, 45%, 0.3);"};
`;

export const Confirm = {
  Button: ConfirmButton,
  Input: ConfirmInput
};
