import React from "react";
import styled, { css } from "styled-components";
import Scroll from "react-scrollbar";
import { IMaskInput } from "react-imask";
import { Map } from "react-yandex-maps";

export const WrapOrder = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 39rem;
  background: var(--white);
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

export const OrderTitle = styled.div`
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
  padding: 0 1rem 1rem;
`;

export const OrderNameBlock = styled.h3`
  color: hsl(0, 0%, 16%);
`;

export const Block = styled.div`
  padding-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  font-size: 0.8rem;
`;

const InputStyled = css`
  border: 1px solid hsla(0, 0%, 0%, 0.3);
  width: 100%;
  padding: 1rem 1rem 1rem 1.5rem;
  margin-top: 0.2rem;
  outline: none;
  transition: border 0.2s ease;
  border-radius: 0.1rem;
  /* color: hsla(220, 100%, 50%, 1); */
  font: inherit;
  :focus {
    border-color: hsla(0, 0%, 0%, 0.6);
  }
  ::placeholder {
    color: hsla(0, 0%, 0%, 0.4);
  }
`;

const InputNumber = styled(IMaskInput).attrs({
  type: "phone",
  autoComplete: "off",
  autoCapitalize: "off",
  spellCheck: "false"
})`
  ${InputStyled};
`;

const InputName = styled.input.attrs({
  type: "text",
  autoComplete: "off",
  autoCapitalize: "words",
  spellCheck: "false"
})`
  text-transform: capitalize;
  ${InputStyled};
`;

const InputEmail = styled.input.attrs({
  type: "text",
  autoComplete: "off",
  spellCheck: "false"
})`
  ${InputStyled};
`;

const InputAdres = styled.input.attrs({
  type: "text",
  autoComplete: "off",
  spellCheck: "false"
})`
  ${InputStyled};
`;

const Label = styled.label`
  color: hsla(0, 0%, 0%, 1);
  display: block;
  font-size: 1rem;
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

const Relative = styled.div`
  position: relative;
  ${props => {
    switch (props.type) {
      case "number":
        return `
          grid-column-start: 1;
          grid-column-end: 2;
        `;

      case "email":
        return `
          grid-column-start: 2;
          grid-column-end: 4;
        `;

      case "name":
        return `
          grid-column-start: 1;
          grid-column-end: 4;
        `;

      case "entrance":
        return `
          grid-column-start: 1;
          grid-column-end: 2;
        `;

      case "apartment":
        return `
          grid-column-start: 2;
          grid-column-end: 3;
        `;

      case "domofon":
        return `
          grid-column-start: 3;
          grid-column-end: 4;
        `;

      default:
        return `
          grid-column-start: 1;
          grid-column-end: 4;
        `;
    }
  }};
`;

export const Input = ({
  type,
  placeholder,
  value,
  onChange,
  label,
  id,
  children
}) => {
  switch (type) {
    case "name":
      return (
        <Relative type={type}>
          <Label>{label}</Label>
          <InputName
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            // name={type}
          />
        </Relative>
      );

    case "email":
      return (
        <Relative type={type}>
          <Label>{label}</Label>
          <InputEmail
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            // name={type}
          />
        </Relative>
      );

    case "number":
      return (
        <Relative type={type}>
          <Label>{label}</Label>
          <InputNumber
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            // name={type}
            mask="0 000 0000000"
          />
          <Plus>+</Plus>
        </Relative>
      );

    case "address":
      return (
        <Relative type={type}>
          <Label>{label}</Label>
          <InputAdres
            placeholder={placeholder}
            value={value}
            onChange={onChange} // name={type}
            id={id}
          />
          {children}
        </Relative>
      );

    case "comment":
      return (
        <Relative type={type}>
          <Label>{label}</Label>
          <Textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            // name={type}
            id={id}
          />
        </Relative>
      );

    default:
      return (
        <Relative type={type}>
          <Label>{label}</Label>
          <InputAdres
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            // name={type}
            id={id}
          />
        </Relative>
      );
  }
};

export const Textarea = styled.textarea.attrs({ maxLength: 250 })`
  ${InputStyled};
  max-width: 100%;
  min-width: 100%;
  min-height: 6rem;
  resize: none;
`;

export const MyMap = styled(Map)`
  grid-column-start: 1;
  grid-column-end: 4;
  /* grid-row-start: 1;
  grid-row-end: 2; */
  width: 100%;
  height: 15rem;
  position: relative;
`;

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

export const FindMeBackground = styled.div`
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

export const Point = styled.svg`
  filter: drop-shadow(0px 3px 3px hsla(0, 0%, 0%, 0.6));
  width: 5rem;
  height: 5rem;
  align-self: center;
  transform: translateY(-2.5rem);
`;

export const DisplayAddress = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--white);
  text-shadow: 0 0 6px hsla(0, 0%, 0%, 0.5), 0 0 12px hsla(0, 0%, 0%, 0.4),
    0 3px 5px hsla(0, 0%, 0%, 0.4);
`;

export const DisplayLocality = styled.div`
  font-size: 1rem;
`;

export const DisplayStreet = styled.div`
  font-size: 1.5rem;
`;

export const MapControls = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Zoom = styled.svg`
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

export const FindMe = styled.svg`
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
