import React from "react";
import moment from "moment";
// UI
import { Footer } from "./ui";

const FooterContent = () => {
  return (
    <Footer.Wrap>
      <Footer.Copyright>
        ©️ {moment().format("YYYY")} LAAPL DELIVERY.
      </Footer.Copyright>
      <Footer.CopyrightGIPHY>
        ВЫРАЖАЕМ БЛАГОДАРНОСТЬ{" "}
        <Footer.Link href="https://giphy.com/" target="_blank">
          giphy
        </Footer.Link>{" "}
        ЗА ГИФКИ.
      </Footer.CopyrightGIPHY>
    </Footer.Wrap>
  );
};

export default FooterContent;
