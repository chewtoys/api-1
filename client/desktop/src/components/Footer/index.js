import React from "react";
import moment from "moment";
import connect from "react-redux/lib/connect/connect";
// UI
import { Footer, Soc, Bank, About } from "./ui";
// IMG
import delivery from "./img/delivery.gif";
import contact from "./img/contact.gif";
import rekvezity from "./img/rekvezity.gif";

const FooterContent = ({ open }) => {
  return (
    <Footer.Wrap open={open}>
      <Footer.Content>
        <Footer.Block>
          <Footer.Title>О нас</Footer.Title>
          <Footer.Item
            interactive
            position="top"
            animateFill={false}
            html={
              <About.Wrap>
                <About.Poster bgImage={delivery} />
                <About.Content>
                  LAAPL DELIVERY - сервис доставки еды из ресторанов на дом.
                </About.Content>
              </About.Wrap>
            }
          >
            Компания
          </Footer.Item>
          <Footer.Item
            interactive
            position="top"
            animateFill={false}
            html={
              <About.Wrap>
                <About.Poster bgImage={contact} />
                <About.Content>
                  Номер: +7 (950) 1111 756
                  <br />
                  Email: laapl@laapl.ru
                </About.Content>
              </About.Wrap>
            }
          >
            Контакты
          </Footer.Item>
          <Footer.Item
            interactive
            position="top"
            animateFill={false}
            html={
              <About.Wrap>
                <About.Poster bgImage={rekvezity} />
                <About.Content>
                  Полное наименование организации: ИНДИВИДУАЛЬНЫЙ
                  ПРЕДПРИНИМАТЕЛЬ ЛАПУНОВ АЛЕКСЕЙ АЛЕКСАНДРОВИЧ
                  <br />
                  Юридический адрес организации: 665466, РОССИЯ, ИРКУТСКАЯ ОБЛ,
                  Г УСОЛЬЕ-СИБИРСКОЕ, ПР-КТ КОСМОНАВТОВ, Д 52, КВ 60
                  <br />
                  ИНН: 381915499636
                  <br />
                  ОГРН: 318385000096922
                </About.Content>
              </About.Wrap>
            }
          >
            Реквизиты
          </Footer.Item>
        </Footer.Block>
        <Footer.Block>
          <Footer.Title>Наш банк</Footer.Title>
          <Bank.Wrap>
            <Bank.Logo href="https://tinkoff.ru" target="_blanc" />
            <Bank.Content>
              <Bank.Item>АО "ТИНЬКОФФ БАНК"</Bank.Item>
              <Bank.Item>РС: 40802810700000766948</Bank.Item>
              <Bank.Item>БИК: 044525974</Bank.Item>
            </Bank.Content>
          </Bank.Wrap>
        </Footer.Block>
        <Footer.Block>
          <Footer.Title>Наши партнёры</Footer.Title>
          <Footer.Link href="https://giphy.com" target="_blanc" />
        </Footer.Block>
        <Footer.Block>
          <Footer.Title>Наши новости</Footer.Title>
          <Soc.Wrap>
            <Soc.Link href="https://vk.com/laaplru" target="_blanc">
              <Soc.Logo>
                <use xlinkHref="#vkLogo" />
                <rect
                  width="100%"
                  height="100%"
                  style={{ fill: "transparent" }}
                />
              </Soc.Logo>
            </Soc.Link>
            <Soc.Link href="https://twitter.com/laaplru" target="_blanc">
              <Soc.Logo style={{ transform: "scale(1.4)" }}>
                <use xlinkHref="#twitterLogo" />
                <rect
                  width="100%"
                  height="100%"
                  style={{ fill: "transparent" }}
                />
              </Soc.Logo>
            </Soc.Link>
            <Soc.Link href="https://instagram.com/laaplru" target="_blanc">
              <Soc.Logo style={{ transform: "scale(1.4)" }}>
                <use xlinkHref="#instagramLogo" />
                <rect
                  width="100%"
                  height="100%"
                  style={{ fill: "transparent" }}
                />
              </Soc.Logo>
            </Soc.Link>
          </Soc.Wrap>
        </Footer.Block>
      </Footer.Content>
      <Footer.Bottom>
        <Footer.Copyright>
          © {moment().format("YYYY")} LAAPL DELIVERY
        </Footer.Copyright>
        <Footer.Policy href="https://laapl.ru/policy-privacy" target="_blanc">
          Политика конфиденциальности
        </Footer.Policy>
      </Footer.Bottom>
    </Footer.Wrap>
  );
};
export default connect(store => ({
  open: store.cart.open
}))(FooterContent);
