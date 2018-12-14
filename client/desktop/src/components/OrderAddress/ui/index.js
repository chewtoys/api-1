import styled, { css } from "styled-components";
import { IMaskInput } from "react-imask";

const BlockCSS = css`
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
  font-size: 0.8rem;
`;

const BlockAddress = styled.div`
  ${BlockCSS};
  grid-template:
    "address address address" 3rem
    "entrance apartment intercom" 3rem
    "comment comment comment" 3rem;
`;

export const Block = {
  Address: BlockAddress
};

const InputStyle = css`
  border: 1px solid hsla(0, 0%, 0%, 0.3);
  width: 100%;
  padding: 1rem;
  /* margin-top: 0.2rem; */
  outline: none;
  transition: border 0.2s ease;
  border-radius: 2rem;
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
  font-size: 0.8rem;
  position: absolute;
  left: 1.3rem;
  top: -0.5rem;
  background: white;
  padding: 0 0.2rem;
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

const Valid = styled.svg`
  ${props => {
    switch (props.validation) {
      case 2:
        return `
          display: none
        `;

      default:
        break;
    }
  }};
  position: absolute;
  right: 0.6rem;
  top: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  padding: 0.2rem;
  color: hsla(0, 0%, 0%, 0.6);
  background: hsla(0, 0%, 0%, 0.1);
`;

export const Input = {
  Input: InputAll,
  Wrap: InputWrap,
  Label: Label,
  Plus: Plus,
  Valid: Valid,
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
  top: 3.1rem;
  left: 0.3rem;
  right: 0.3rem;
  background: white;
  border-radius: 2rem;
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
    border-radius: 2rem 2rem 0 0;
  }
  :last-child {
    border-radius: 0 0 2rem 2rem;
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
