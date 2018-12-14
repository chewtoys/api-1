import axios from "axios";

export const createPayLink = e => {
  const { data, total } = e;

  axios({
    method: "POST",
    url: "https://securepay.tinkoff.ru/v2/Init",
    headers: { "Content-Type": "application/json" },
    data: {
      TerminalKey: "1540469806401DEMO",
      Amount: (total + 250) * 100,
      OrderId: "14887001",
      Description: "",
      Frame: true,
      Language: "ru",
      DATA: {
        // Email: "laapl@yandex.ru",
        Phone: "79501111756",
        Name: "Борис Хасиков",
        connection_type: "Widget2.0"
      },
      Receipt: {
        Taxation: "usn_income_outcome",
        Phone: "79501111756",
        Items: data
          .map(item => {
            return {
              Name: item.title,
              Price: item.price * 100,
              Quantity: item.count,
              Amount: item.price * item.count * 100,
              Tax: "none"
            };
          })
          .concat([
            {
              Name: "Доставка",
              Price: 250 * 100,
              Quantity: 1,
              Amount: 250 * 100,
              Tax: "none"
            }
          ])
      }
    }
  }).then(res => {
    console.log(res);
  });
};
