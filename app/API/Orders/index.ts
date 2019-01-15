import Main from "../../Main";
import Sequelize from "../../Models";
import axios from "axios";
import crypto from "crypto";
import moment from "moment";

export default class Orders extends Main {
  user: any;
  order: any;
  order_data: any;
  product: any;
  payment: any;
  project: any;
  setting: any;
  address: any;
  code: any;

  constructor() {
    super();

    this.Logger.info("Orders Class init");
    this.user = Sequelize.models.user;
    this.order = Sequelize.models.order;
    this.order_data = Sequelize.models.order_data;
    this.product = Sequelize.models.product;
    this.payment = Sequelize.models.payment;
    this.project = Sequelize.models.project;
    this.setting = Sequelize.models.setting;
    this.address = Sequelize.models.address;
    this.code = Sequelize.models.code;
  }

  /**
   * Обработка нотификаций от банка
   * @param {string} TerminalKey - идентификатор магазина
   * @param {string} OrderId - ID заказа
   * @param {boolean} Success - успешность
   * @param {string} Status - статус платежа
   * @param {number} PaymentId - идентификатор платежа
   * @param {string} ErrorCode - код ошибки, если произошла ошибка
   * @param {number} Amount - сумма транзакции в копейках
   * @param {number} [RebillId] - ID рекуррентного платежа
   * @param {number} CardId - идентификатор привязанной карты
   * @param {string} Pan - маскированный номер карты
   * @param {string} [DATA] - дополнительные параметры платежа
   * @param {string} Token - подпись запроса
   * @param {string} ExpDate - срок действия карты
   */
  public async notifications({
    TerminalKey,
    OrderId,
    Success,
    Status,
    PaymentId,
    ErrorCode,
    Amount,
    RebillId,
    CardId,
    Pan,
    DATA,
    Token,
    ExpDate,
  }: {
    TerminalKey: string;
    OrderId: string;
    Success: boolean;
    Status: string;
    PaymentId: number;
    ErrorCode: string;
    Amount: number;
    RebillId?: number;
    CardId: number;
    Pan: string;
    DATA?: string;
    Token: string;
    ExpDate: string;
  }) {
    // Проверка токена
    let data: any = {
      TerminalKey: TerminalKey,
      OrderId: OrderId,
      Success: Success,
      Status: Status,
      PaymentId: PaymentId,
      ErrorCode: ErrorCode,
      Amount: Amount,
      CardId: CardId,
      Pan: Pan,
      ExpDate: ExpDate,
    };

    if (RebillId !== undefined) data["RebillId"] = RebillId;
    if (DATA !== undefined) data["DATA"] = DATA;

    const project = await this.project.findOne({
      where: {
        [Sequelize.Op.or]: [{ terminal_key: TerminalKey }, { terminal_demokey: TerminalKey }],
      },
    });

    if (project.production) {
      data["Password"] = project.password;
    } else {
      data["Password"] = project.demopassword;
    }

    const keys = Object.keys(data).sort();
    let generated_token: string = "";

    for (let key of keys) {
      generated_token += data[key];
    }

    generated_token = crypto
      .createHash("sha256")
      .update(generated_token)
      .digest("hex");

    if (Token !== generated_token) {
      throw new Error("Неверный токен");
    }

    // Создание/обновления платежа в базе данных
    const result = await this.payment.findOrCreate({
      where: {
        payment_id: PaymentId,
        terminal_key: TerminalKey,
      },
      defaults: {
        fk_order_id: OrderId,
        success: Success,
        status: Status,
        error_code: ErrorCode,
        amount: Amount / 100,
        card_id: CardId,
        pan: Pan,
        token: Token,
        exp_date: ExpDate,
      },
    });

    const payment: any = result[0];
    const created: boolean = result[1];

    if (!payment) throw new Error("Неизвестная ошибка");

    if (!created) {
      payment.update({
        success: Success,
        status: Status,
        error_code: ErrorCode,
        token: Token,
      });
    }

    if (Success && (Status == "AUTHORIZED" || Status == "CONFIRMED")) {
      // Изменение статуса заказа на "Оплачен"
      const order = await this.order.findOne({
        where: {
          order_id: OrderId,
        },
      });

      if (order.fk_status_id == 1) {
        order.update({
          fk_status_id: 2,
        });

        // const delivery_cost = Number((await this.setting.findOne({
        //   where: {
        //     fk_project_id: project.idproject,
        //     setting_id: "delivery_cost"
        //   }
        // })).value);

        // this.BotSocket.emit("new_order", {
        //   idorder: order.idorder,
        //   delivery_cost
        // });
      }
    }

    return "OK";
  }

  /**
   * @description Создание нового заказа
   * @param {string} project_id - ID проекта
   * @param {string} phone - номер телефона
   * @param {number} lat - latitude
   * @param {number} lon - longitude
   * @param {string} address - адрес
   * @param {string} entrance - информация о подъезде
   * @param {string} apartment - информация о квартире
   * @param {any} items - массив с содержимым заказа
   * @param {string} [name] - имя клиента
   * @param {string} [email] - email клиента
   * @param {string} [intercom] - информация о домофоне
   * @param {string} [order_datetime] - дата и время, на которое заказана доставка
   * @param {string} [comment] - комментарий к заказу
   * @param {boolean} [remember] - сохранить адрес
   * @param {string} [alias] - название адреса для сохранения
   */
  public async create({
    project_id,
    phone,
    lat,
    lon,
    address,
    entrance,
    apartment,
    items,
    name,
    email,
    intercom,
    order_datetime,
    comment,
    remember,
    alias,
  }: {
    project_id: string;
    phone: string;
    lat: number;
    lon: number;
    address: string;
    entrance: string;
    apartment: string;
    items: any;
    name?: string;
    email?: string;
    intercom?: string;
    order_datetime?: string;
    comment?: string;
    remember?: boolean;
    alias?: string;
  }) {
    // Валидация данных
    const phone_reg = /^[0-9]{11}$/;
    const email_reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;

    if (!phone_reg.test(phone)) throw new Error("Некорректный номер телефона");
    if (typeof email !== "undefined" && email !== "" && !email_reg.test(email)) throw new Error("Некорректный email");
    if (!items.length) throw new Error("Заказ пуст");

    const project = await this.project.findOne({
      where: {
        actual: true,
        project_id,
      },
    });

    if (!project) throw new Error("Несуществующий project_id");

    // Проверка подтверждения номера
    const code = await this.code.findOne({
      where: {
        fk_operation_id: 1,
        recipient: phone,
        lifetime: {
          [Sequelize.Op.gte]: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        confirmed: true
      },
      limit: 1,
      order: [
        ["code_id", "DESC"]
      ]
    });

    if (!code) throw new Error("Не подтвержден номер, либо истекло время сессии");

    // Поиск пользователя с таким номером. Если такого нет, создаем нового.
    const user_data = await this.user.findOrCreate({
      where: { phone },
      defaults: { email, name },
    });

    const user = user_data[0];
    const created_user = user_data[1];

    if (!created_user) {
      // Если пользователь уже есть, обновляем email и имя
      user.update({ email, name });
    }

    if (remember) {
      // Сохранение адреса
      if (!alias) throw new Error("Не указано название сохраняемого адреса");

      const created_address = (await this.address.findOrCreate({
        where: {
          fk_user_id: user.user_id,
          point: Sequelize.fn("ST_GeomFromText", `POINT(${lat} ${lon})`),
        },
        defaults: {
          address,
          entrance,
          apartment,
          intercom,
          alias,
        },
      }))[1];

      if (!created_address) {
        // Эти координаты уже сохранены у этого пользователя. Обновляем информацию о них.
        this.address.update(
          {
            address,
            entrance,
            apartment,
            intercom,
            alias,
          },
          {
            where: {
              fk_user_id: user.user_id,
              point: Sequelize.fn("ST_GeomFromText", `POINT(${lat} ${lon})`),
            },
          }
        );
      }
    }

    const delivery_cost = Number(
      (await this.setting.findOne({
        where: {
          setting_id: "delivery_cost",
          fk_project_id: project_id,
        },
      })).value
    );

    // Создание заказа
    const order = await this.order.create({
      fk_project_id: project_id,
      fk_user_id: user.user_id,
      fk_status_id: 1,
      point: { type: "Point", coordinates: [lat, lon] },
      address,
      entrance,
      apartment,
      intercom,
      comment,
      delivery_cost,
      order_datetime,
    });

    // Сохранение содержимого заказа
    for (let item of items) {
      this.order_data.create({
        fk_order_id: order.order_id,
        fk_product_id: item.product_id,
        amount: item.amount,
      });
    }

    // Подсчет стоимости заказа
    let total = 0;
    const items_id = items.map((item: any) => {
      return item.product_id;
    });
    const products = await this.product.findAll({
      where: {
        product_id: items_id,
      },
    });

    for (let item of items) {
      const product = products.filter((subitem: any) => {
        return subitem.product_id === item.product_id;
      });
      total += product[0].price * item.amount;
    }

    // Получение ссылки для оплаты
    const res = await axios({
      method: "POST",
      url: "https://securepay.tinkoff.ru/v2/Init",
      headers: { "Content-Type": "application/json" },
      data: {
        TerminalKey: project.production ? project.terminal_key : project.terminal_demokey,
        Amount: (total + delivery_cost) * 100,
        OrderId: order.order_id,
        Description: "",
        Frame: true,
        Language: "ru",
        DATA: {
          Email: (typeof email !== "undefined" && email.length) ? email : undefined,
          Phone: phone,
          Name: name,
          connection_type: "Widget2.0",
        },
        Receipt: {
          Taxation: "usn_income_outcome",
          Email: (typeof email !== "undefined" && email.length) ? email : undefined,
          EmailCompany: "info@laapl.ru",
          Phone: phone,
          Items: products
            .map((product: any) => {
              const item = items.filter((subitem: any) => {
                return subitem.product_id === product.product_id;
              })[0];
              return {
                Name: product.title,
                Price: product.price * 100,
                Quantity: item.amount,
                Amount: product.price * item.amount * 100,
                Tax: "none",
              };
            })
            .concat([
              {
                Name: "Доставка",
                Price: delivery_cost * 100,
                Quantity: 1,
                Amount: delivery_cost * 100,
                Tax: "none",
              },
            ]),
        },
      },
    });

    return [
      {
        url: res.data.PaymentURL,
        delivery_cost,
      },
    ];
  }

  // /**
  //  * @description Получение информации о заказе/заказах
  //  * @param {string} [date_start=moment()] - start date
  //  * @param {string} [date_end=moment()] - end date
  //  * @param {number} [idorder] - order id
  //  * @param {number} [idclient] - client id
  //  * @param {number} [idcourier] - courier id
  //  * @param {boolean} [debug=false] - debug mode
  //  */
  // public async get(query: any) {
  //   // По умолчанию возвращает все заказы на сегодня
  //   if (!query.date_start && !query.idorder) query.date_start = moment().format("YYYY-MM-DD");
  //   if (!query.date_end) query.date_end = moment().format("YYYY-MM-DD");

  //   let params: any[] = [this.table.orders, this.table.users, this.table.orders_data, this.table.products, this.table.categories, this.table.orders_states];

  //   let restrictions: string[] = [];

  //   if (query.date_start) {
  //     restrictions.push(`DATE(t1.order_datetime) BETWEEN ? AND ?`);
  //     params.push(query.date_start);
  //     params.push(query.date_end);
  //   } else {
  //     restrictions.push(`DATE(t1.order_datetime) <= ?`);
  //     params.push(query.date_end);
  //   }

  //   if (query.idorder) {
  //     restrictions.push(`t1.idorder = ?`);
  //     params.push(query.idorder);
  //   }

  //   if (query.idclient) {
  //     restrictions.push(`t1.idclient = ?`);
  //     params.push(query.idclient);
  //   }

  //   if (query.idcourier) {
  //     restrictions.push(`t1.idcourier = ?`);
  //     params.push(query.idcourier);
  //   }

  //   const where_clause: any = restrictions.length ? restrictions.join(" AND ") : 1;

  //   const sql: string = `
  //     SELECT
  //       t1.*,
  //       t2.name AS client_name,
  //       t2.email AS client_email,
  //       t2.phone AS client_phone,
  //       t4.idproduct AS idproduct,
  //       t4.title AS product_title,
  //       t4.big_img AS product_big_img,
  //       t4.price AS product_price,
  //       t5.idcategory AS idcategory,
  //       t5.name AS categoy_name,
  //       t5.icon AS category_icon,
  //       t6.name AS state
  //     FROM ?? AS t1
  //     INNER JOIN ?? AS t2 ON t1.idclient = t2.iduser
  //     INNER JOIN ?? AS t3 ON t1.idorder = t3.idorder
  //     INNER JOIN ?? AS t4 ON t3.idproduct = t4.idproduct
  //     INNER JOIN ?? AS t5 ON t4.idcategory = t5.idcategory
  //     INNER JOIN ?? AS t6 ON t1.idstate = t6.idstate
  //     WHERE ${where_clause}
  //     ORDER BY t1.order_datetime
  //   `;

  //   const data: any = await this.Db.query(sql, params);

  //   let idorders: number[] = [];
  //   let modifdata: any[] = [];

  //   data.forEach((item: any) => {
  //     if (idorders.indexOf(item.idorder) === -1) {
  //       idorders.push(item.idorder);
  //       let orderItems: any[] = data.filter((subitem: any) => {
  //         return subitem.idorder === item.idorder;
  //       });

  //       modifdata.push({
  //         idorder: item.idorder,
  //         idclient: item.idclient,
  //         client_name: item.client_name,
  //         client_email: item.client_email,
  //         client_phone: item.client_phone,
  //         idstate: item.idstate,
  //         state: item.state,
  //         address: item.address,
  //         comment: item.comment,
  //         paid: item.paid,
  //         created_datetime: item.createdAt,
  //         order_datetime: item.order_datetime,
  //         lead_datetime: item.lead_datetime,
  //         items: orderItems.map((item: any) => {
  //           return {
  //             idcategory: item.idcategory,
  //             category: item.category_name,
  //             category_icon: item.category_icon,
  //             idproduct: item.idproduct,
  //             product: item.product_title,
  //             big_img: item.product_big_img,
  //             price: item.product_price,
  //           };
  //         }),
  //       });
  //     }
  //   });

  //   return {
  //     data: modifdata,
  //   };
  // }
}
