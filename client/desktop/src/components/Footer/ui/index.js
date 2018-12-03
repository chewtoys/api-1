import styled from "styled-components";
import giphy from "../img/giphy.png";

const FooterWrap = styled.div`
  height: 4rem;
  padding: 1rem 7rem;
  display: flex;
  align-items: center;
  color: var(--white);
  text-shadow: 0 0 8px hsla(0, 0%, 0%, 0.5), 0 0 15px hsla(0, 0%, 0%, 0.4);
  font-weight: 100;
`;

const Copyright = styled.div`
  margin-right: 1rem;
`;

const CopyrightGIPHY = styled.div`
  margin-right: 1rem;
`;

const Giphy = styled.a`
  background-image: url(${giphy});
  background-size: 4rem 1rem;
  width: 4rem;
  height: 1rem;
  font-size: 0;
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
  position: relative;
  top: -1px;
`;

export const Footer = {
  Wrap: FooterWrap,
  Copyright: Copyright,
  CopyrightGIPHY: CopyrightGIPHY,
  Link: Giphy
};
