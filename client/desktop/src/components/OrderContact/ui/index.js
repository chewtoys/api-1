import styled, { css } from "styled-components";
import { IMaskInput } from "react-imask";
// import { darken } from "polished";

export const NameBlock = styled.h3`
  color: hsl(0, 0%, 16%);
`;

const BlockCSS = css`
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
  font-size: 0.8rem;
`;

const BlockContacts = styled.div`
  ${BlockCSS};
  grid-template: "number email username" 3rem;
`;

export const Block = {
  Contacts: BlockContacts
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
  :disabled {
    background: white;
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
  top: 1.05rem;
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
  InputNumber: InputNumber,
  Valid: Valid
};

const ConfirmButton = styled.div`
  ${props => (props.visible ? "display: flex" : "display: none")};
  position: absolute;
  right: 0.6rem;
  top: 0.5rem;
  width: 6rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: hsla(0, 0%, 0%, 0.6);
  background: hsla(0, 0%, 0%, 0.1);
  border-radius: 2rem;
  cursor: pointer;
`;

const ConfirmInput = styled.input`
  position: absolute;
  right: 0.6rem;
  top: 0.5rem;
  width: 6rem;
  height: 2rem;
  padding: 0 1rem;
  outline: none;
  text-align: center;
  border-radius: 2rem;
  ${props =>
    props.verify === 0
      ? "border: 1px solid hsla(349, 100%, 45%, 0.3);"
      : "border: 1px solid hsla(0,0%,0%,0.3);"};
`;

export const Confirm = {
  Button: ConfirmButton,
  Input: ConfirmInput
};
