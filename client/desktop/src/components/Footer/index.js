import React from "react";
import moment from "moment";
// UI
import { Footer } from "./ui";

const FooterContent = () => {
  return (
    <Footer.Wrap>
      <Footer.Content>
        <Footer.Block>1</Footer.Block>
        <Footer.Block>2</Footer.Block>
        <Footer.Block>3</Footer.Block>
      </Footer.Content>
      <Footer.Logo>
        <use xlinkHref="#logo" />
        <rect width="100%" height="100%" style={{ fill: "transparent" }} />
      </Footer.Logo>
      <Footer.Copyright>
        © {moment().format("YYYY")} LAAPL DELIVERY.
      </Footer.Copyright>
      {/* <Footer.CopyrightGIPHY>
        ВЫРАЖАЕМ БЛАГОДАРНОСТЬ{" "}
        <Footer.Link href="https://giphy.com/" target="_blank">
          giphy
        </Footer.Link>{" "}
        ЗА ГИФКИ.
      </Footer.CopyrightGIPHY> */}
    </Footer.Wrap>
  );
};

export default FooterContent;
