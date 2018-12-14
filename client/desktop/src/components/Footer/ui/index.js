import styled from "styled-components";
import { Tooltip } from "react-tippy";
// IMG
import giphy from "../../../img/giphy.png";
import tinkoff from "../../../img/tinkoff-bank.png";

const FooterWrap = styled.div`
  /* height: 4rem; */
  padding: 1rem 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  text-shadow: 0 0 8px hsla(0, 0%, 0%, 0.5), 0 0 15px hsla(0, 0%, 0%, 0.4);
  font-weight: 100;
  ${props => (props.open ? "filter: blur(2px)" : "")};
  opacity: 0.4;
  transition: opacity 0.3s ease;
  :hover {
    opacity: 0.8;
  }
`;

const Copyright = styled.div`
  margin-right: 1rem;
`;

const CopyrightGIPHY = styled.div`
  margin-right: 1rem;
`;

const Giphy = styled.a`
  background-image: url(${giphy});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 10rem;
  height: 3rem;
  font-size: 0;
  display: inline-block;
  filter: drop-shadow(0px 3px 3px hsla(0, 0%, 0%, 0.6));
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Block = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const BlockItem = styled(Tooltip)`
  padding-bottom: 0.1rem;
  cursor: pointer;
`;

const Logo = styled.svg`
  width: 4rem;
  height: 2rem;
  color: red;
`;

const CCBlock = styled.div`
  display: inline-flex;
  flex-direction: row;
`;

const CCLogo = styled.svg`
  width: 2rem;
  height: 2rem;
  filter: drop-shadow(0px 3px 3px hsla(0, 0%, 0%, 0.4));
`;

const CCLink = styled.a`
  margin-right: 0.5rem;
  pointer-events: fill;
  :last-child {
    margin-right: 0;
  }
`;

const TinkoffLogo = styled.a`
  background-image: url(${tinkoff});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 4rem;
  height: 3.5rem;
  filter: drop-shadow(0px 3px 3px hsla(0, 0%, 0%, 0.4));
`;

const BankContent = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-left: 1rem;
  justify-content: space-between;
`;

const BankWrap = styled.div`
  display: inline-flex;
  flex-direction: row;
`;

const BankItem = styled.div`
  display: inline-flex;
`;

const AboutWrap = styled.div`
  width: 20rem;
`;

const AboutPoster = styled.div`
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  border-radius: 0.3rem;
  box-shadow: 0 2px 5px hsla(0, 0%, 0%, 0.4);
  width: 100%;
  height: 10rem;
  margin-top: 0.3rem;
`;

const AboutContent = styled.div`
  padding-top: 1rem;
  text-align: left;
  margin-bottom: 0.3rem;
`;

const Policy = styled.a`
  display: inline-flex;
  color: white;
  text-decoration: none;
`;

export const About = {
  Wrap: AboutWrap,
  Poster: AboutPoster,
  Content: AboutContent
};

export const Footer = {
  Wrap: FooterWrap,
  Content: Content,
  Bottom: Bottom,
  Block: Block,
  Title: Title,
  Item: BlockItem,
  Copyright: Copyright,
  CopyrightGIPHY: CopyrightGIPHY,
  Link: Giphy,
  Logo: Logo,
  Policy: Policy
};

export const Soc = {
  Wrap: CCBlock,
  Link: CCLink,
  Logo: CCLogo
};

export const Bank = {
  Logo: TinkoffLogo,
  Content: BankContent,
  Item: BankItem,
  Wrap: BankWrap
};
