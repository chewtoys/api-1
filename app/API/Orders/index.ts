import Main from "../../Main";
import Sequelize from "../../Models";
import axios from "axios";
import crypto from "crypto";

export default class Orders extends Main {
  delivery_cost: number;
  user: any;
  order: any;
  product: any;
  payment: any;
  project: any;

  constructor() {
    super();

    this.delivery_cost = 250;
    this.user = Sequelize.models.user;
    this.order = Sequelize.models.order;
    this.product = Sequelize.models.product;
    this.payment = Sequelize.models.payment;
    this.project = Sequelize.models.project;
    this.table = {
      categories: "categories",
      users: "users",
      orders: "orders",
      orders_data: "orders_data",
      orders_states: "orders_states",
      products: "products",
      saved_addresses: "saved_addresses",
    };
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
    ExpDate
  }: {
    TerminalKey: string,
    OrderId: string,
    Success: boolean,
    Status: string,
    PaymentId: number,
    ErrorCode: string,
    Amount: number,
    RebillId?: number,
    CardId: number,
    Pan: string,
    DATA?: string,
    Token: string,
    ExpDate: string
  }) {
    // Проверка токена
    let data: any = {
      "TerminalKey": TerminalKey,
      "OrderId": OrderId,
      "Success": Success,
      "Status": Status,
      "PaymentId": PaymentId,
      "ErrorCode": ErrorCode,
      "Amount": Amount,
      "CardId": CardId,
      "Pan": Pan,
      "ExpDate": ExpDate
    };

    if (RebillId !== undefined) data["RebillId"] = RebillId;
    if (DATA !== undefined) data["DATA"] = DATA;

    const project = await this.project.findOne({
      where: {
        [Sequelize.Op.or]: [
          { key: TerminalKey },
          { demokey: TerminalKey }
        ]
      }
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

    generated_token = crypto.createHash("sha256").update(generated_token).digest("hex");

    if (Token !== generated_token) {
      throw new Error("Неверный токен");
    }

    // Создание/обновления платежа в базе данных
    const result = await this.payment.findOrCreate({
      where: {
        id_payment: PaymentId,
        terminal_key: TerminalKey,
      },
      defaults: {
        id_order: OrderId,
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
          idorder: OrderId
        }
      });

      if (order.idstate == 1) {
        order.update({
          idstate: 2
        });

        this.BotSocket.connection.emit("new_order", order);
      }
    }

    return "OK";
  }

  /**
   * @description Создание нового заказа
   * @param {string} phone - номер телефона
   * @param {string} email - email
   * @param {string} name - имя
   * @param {string} lat - latitude
   * @param {string} lon - longitude
   * @param {string} address - адрес
   * @param {string} entrance - номер подъезда
   * @param {string} apartment - номер квартиры
   * @param {string} intercom - домофон
   * @param {datetime} order_datetime - дата и время, на которое заказана доставка
   * @param {string} comment - комментарий к заказу
   * @param {boolean} [remember] - запомнить адрес
   * @param {string} [address_alias] - название адреса
   * @param {array} items - массив с содержимым заказа
   */
  public async create({
    idproject,
    phone,
    email,
    name,
    lat,
    lon,
    address,
    entrance,
    apartment,
    intercom,
    items,
    order_datetime,
    comment,
    remember,
    address_alias,
  }: {
    idproject: string,
    phone: string;
    email?: string;
    name?: string;
    lat: number;
    lon: number;
    address: string;
    entrance: string;
    apartment: string;
    items: any[];
    order_datetime: string;
    intercom?: string;
    comment?: string;
    remember?: boolean;
    address_alias?: string;
  }) {
    // Валидация данных
    const phone_reg = /^[0-9]{11}$/;
    const email_reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;
  
    if (!phone_reg.test(phone)) throw new Error("Некорректный номер телефона");
    if (email !== undefined && !email_reg.test(email)) throw new Error("Некорректный email");
    if (!address.length) throw new Error("Укажите адрес");
    if (!entrance.length) throw new Error("Укажите номер подъезда");
    if (!items.length) throw new Error("Заказ пуст");

    // Поиск пользователя с таким номером. Если такого нет, создаем нового.
    const data = await this.user.findOrCreate({
      where: {
        phone: phone,
      },
      defaults: {
        email: email,
        name: name,
        phone_confirmed: 1,
        email_confirmed: 0,
      },
    });

    const user = data[0];
    const created = data[1];

    if (!created && (email !== undefined || name !== undefined)) {
      // Пользователь с таким номером уже есть. Обновляем email и имя, если были указаны.
      let updates: any = {};
      if (email !== undefined) updates.email = email;
      if (name !== undefined) updates.name = name;
      user.update(updates);
    }

    if (remember) {
      // Сохранение адреса
      if (!address_alias) throw new Error("Не указано название сохраняемого адреса");

      let columns = ["iduser", "lat", "lon", "address", "entrance", "apartment", "alias"];
      let replacements = [user.iduser, lat, lon, address, entrance, apartment, address_alias];

      if (intercom) {
        columns.push("intercom");
        replacements.push(intercom);
      }

      Sequelize.query(
        `
          INSERT INTO ${this.table.saved_addresses} (${columns.join(', ')})
          VALUES (?, ?, ?, ?, ?, ?, ? ${(intercom) ? ", ?" : ""})
          ON DUPLICATE KEY UPDATE
            address = VALUES(address),
            entrance = VALUES(entrance),
            apartment = VALUES(apartment),
            alias = VALUES(alias)
            ${(intercom) ? ", intercom = VALUES(intercom)": ""}
        `,
        { replacements }
      );
    }

    // Создание заказа
    const order = await this.order.create({
      idclient: user.iduser,
      idstate: 1,
      lat: lat,
      lon: lon,
      address: address,
      entrance: entrance,
      apartment: apartment,
      intercom: intercom,
      comment: comment,
      order_datetime: order_datetime,
    });

    // Сохранение содержимого заказа
    const itemsInsert = items.map((item: any) => {
      return `("${order.idorder}", "${item.id}", "${item.count}")`;
    });

    Sequelize.query(`
      INSERT INTO ${this.table.orders_data} (idorder, idproduct, count)
      VALUES ${itemsInsert.join(", ")}
    `);

    // Подсчет стоимости заказа
    let total = 0;
    const items_id = items.map((item: any) => {
      return item.id;
    });
    const products = await this.product.findAll({
      where: {
        idproduct: items_id,
      },
    });

    for (let item of items) {
      const product = products.filter((subitem: any) => {
        return subitem.idproduct === item.id;
      });
      total += product[0].price * item.count;
    }

    const project = await this.project.findOne({
      where: { idproject }
    });

    if (project === null) throw new Error(`Не найден idproject (${idproject})`);

    // Получение ссылки для оплаты
    const res = await axios({
      method: "POST",
      url: "https://securepay.tinkoff.ru/v2/Init",
      headers: { "Content-Type": "application/json" },
      data: {
        TerminalKey: (project.production) ? project.key : project.demokey,
        Amount: (total + this.delivery_cost) * 100,
        OrderId: order.idorder,
        Description: "",
        Frame: true,
        Language: "ru",
        DATA: {
          Email: email,
          Phone: phone,
          Name: name,
          connection_type: "Widget2.0",
        },
        Receipt: {
          Taxation: "usn_income_outcome",
          Phone: phone,
          Items: products
            .map((product: any) => {
              const item = items.filter((subitem: any) => {
                return subitem.id === product.idproduct;
              })[0];
              return {
                Name: product.title,
                Price: product.price * 100,
                Quantity: item.count,
                Amount: product.price * item.count * 100,
                Tax: "none",
              };
            })
            .concat([
              {
                Name: "Доставка",
                Price: this.delivery_cost * 100,
                Quantity: 1,
                Amount: this.delivery_cost * 100,
                Tax: "none",
              },
            ]),
        },
      },
    });

    return [
      {
        url: res.data.PaymentURL,
        delivery_cost: this.delivery_cost,
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
