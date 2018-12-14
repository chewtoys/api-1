import React from "react";
import moment from "moment";
import connect from "react-redux/lib/connect/connect";
// UI
import { Footer, Soc, Bank, About } from "./ui";
// IMG
import delivery from "../../img/delivery.gif";
import contact from "../../img/contact.gif";
import rekvezity from "../../img/rekvezity.gif";
// Lang
import TextComponents from "../../lang/ru.json";

const FooterContent = ({ open }) => {
  return (
    <Footer.Wrap open={open}>
      <Footer.Content>
        <Footer.Block>
          <Footer.Title>{TextComponents["footer.about.title"]}</Footer.Title>
          <Footer.Item
            interactive
            position="top"
            animateFill={false}
            html={
              <About.Wrap>
                <About.Poster bgImage={delivery} />
                <About.Content>
                  {TextComponents["footer.about.company"].map(item => {
                    return <div>{item}</div>;
                  })}
                </About.Content>
              </About.Wrap>
            }
          >
            {TextComponents["footer.about.link.company"]}
          </Footer.Item>
          <Footer.Item
            interactive
            position="top"
            animateFill={false}
            html={
              <About.Wrap>
                <About.Poster bgImage={contact} />
                <About.Content>
                  {TextComponents["footer.about.contacts"].map(item => {
                    return <div>{item}</div>;
                  })}
                </About.Content>
              </About.Wrap>
            }
          >
            {TextComponents["footer.about.link.contacts"]}
          </Footer.Item>
          <Footer.Item
            interactive
            position="top"
            animateFill={false}
            html={
              <About.Wrap>
                <About.Poster bgImage={rekvezity} />
                <About.Content>
                  {TextComponents["footer.about.requisite"].map(item => {
                    return <div>{item}</div>;
                  })}
                </About.Content>
              </About.Wrap>
            }
          >
            {TextComponents["footer.about.link.requisite"]}
          </Footer.Item>
        </Footer.Block>
        <Footer.Block>
          <Footer.Title>{TextComponents["footer.partners.title"]}</Footer.Title>
          <Bank.Wrap>
            <Bank.Logo href="https://tinkoff.ru" target="_blanc" />
            <Bank.Content>
              {TextComponents["footer.bank"].map(item => {
                return <Bank.Item>{item}</Bank.Item>;
              })}
            </Bank.Content>
          </Bank.Wrap>
        </Footer.Block>
        <Footer.Block>
          <Footer.Title>{TextComponents["footer.bank.title"]}</Footer.Title>
          <Footer.Link href="https://giphy.com" target="_blanc" />
        </Footer.Block>
        <Footer.Block>
          <Footer.Title>{TextComponents["footer.news.title"]}</Footer.Title>
          <Soc.Wrap>
            <Soc.Link href="https://vk.com/laaplru" target="_blanc">
              <Soc.Logo>
                <use xlinkHref="#vkLogo" />
                <rect width="100%" height="100%" fill="transparent" />
              </Soc.Logo>
            </Soc.Link>
            <Soc.Link href="https://twitter.com/laaplru" target="_blanc">
              <Soc.Logo style={{ transform: "scale(1.4)" }}>
                <use xlinkHref="#twitterLogo" />
                <rect width="100%" height="100%" fill="transparent" />
              </Soc.Logo>
            </Soc.Link>
            <Soc.Link href="https://instagram.com/laaplru" target="_blanc">
              <Soc.Logo style={{ transform: "scale(1.4)" }}>
                <use xlinkHref="#instagramLogo" />
                <rect width="100%" height="100%" fill="transparent" />
              </Soc.Logo>
            </Soc.Link>
          </Soc.Wrap>
        </Footer.Block>
      </Footer.Content>
      <Footer.Bottom>
        <Footer.Copyright>
          © {moment().format("YYYY")} {TextComponents["footer.copyright"]}
        </Footer.Copyright>
        <Footer.Policy href="https://laapl.ru/policy-privacy" target="_blanc">
          {TextComponents["footer.policy.link"]}
        </Footer.Policy>
      </Footer.Bottom>
    </Footer.Wrap>
  );
};
export default connect(store => ({
  open: store.cart.open
}))(FooterContent);
