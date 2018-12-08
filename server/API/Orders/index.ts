import Main from '../../Main';
import Functions from '../../Main/Functions';
import Models from '../../Models';
import axios from 'axios';

export default class Orders extends Main {  
  functions: Functions;
  response: responseAPI;
  table: tableList;
  [propName: string]: any;

  constructor() {
    super();

    this.functions = new Functions;
    this.delivery_cost = 250;
    this.user = Models.User;
    this.order = Models.Order;
    this.product = Models.Product;
    this.response = {
      result: false
    };
    this.table = {
      orders_data: 'orders_data',
      saved_addresses: 'saved_addresses'
    };
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
   * @param {boolean} [debug] - режим отладки
   */
  public async create(body: any) {
    // Проверка обязательных параметров
    const required = [
      'phone',
      'email',
      'name',
      'lat',
      'lon',
      'address',
      'entrance',
      'apartment',
      'intercom',
      'comment',
      'order_datetime',
      'items',
    ];

    for (let param of required) {
      if (typeof body[param] === 'undefined') {
        if (body.debug) this.functions.paramsError();
        else this.functions.unknownError();
      }
    }

    // Валидация данных
    const phone_reg = /^[0-9]{11}$/;
    const email_reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;
    const name_reg = /^[a-zа-яё]{2,32}$/i;

    if (!phone_reg.test(body.phone)) throw new Error('Некорректный номер телефона');
    if (!email_reg.test(body.email)) throw new Error('Некорректный email');
    if (!name_reg.test(body.name)) throw new Error('Некорректное имя');
    if (!body.address.length) throw new Error('Укажите адрес');
    if (!body.entrance.length) throw new Error('Укажите номер подъезда');
    if (!body.items.length) throw new Error('Заказ пуст');

    // Поиск пользователя с таким номером. Если такого нет, создаем нового.
    const data = await this.user.findOrCreate({
      where: {
        phone: body.phone
      },
      defaults: {
        email: body.email,
        name: body.name,
        phone_confirmed: 1,
        email_confirmed: 0
      }
    });

    const user = data[0];
    const created = data[1];

    if (user) {
      if (!created) {
        // Пользователь с таким номером уже есть. Обновляем email и имя.
        user.update({
          email: body.email,
          name: body.name
        });
      }
    } else {
      this.functions.unknownError();
    }

    if (body.remember) {
      // Сохранение адреса
      const sql = `
        INSERT INTO ?? (iduser, lat, lon, address, entrance, apartment, intercom, aliase)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          aliase = VALUES(aliase)
      `;
      const params = [
        this.table.saved_addresses,
        user.iduser,
        body.lat,
        body.lon,
        body.address,
        body.entrance,
        body.apartment,
        body.intercom,
        body.address_aliase
      ];
      await this.Db.query(sql, params);
    }

    // Создание заказа
    const order = await this.order.create({
      idclient: user.iduser,
      idstate: 1,
      lat: body.lat,
      lon: body.lon,
      address: body.address,
      entrance: body.entrance,
      apartment: body.apartment,
      intercom: body.intercom,
      comment: body.comment,
      order_datetime: body.order_datetime
    });

    // Сохранение содержимого заказа
    const items = body.items.map((item: any) => {
      return `('${order.idorder}', '${item.id}', '${item.count}')`;
    });

    await this.Db.query(`
      INSERT INTO ?? (idorder, idproduct, count)
      VALUES ${items.join(', ')}
    `, [this.table.orders_data]);


    // Подсчет стоимости заказа
    let total = 0;
    const items_id = body.items.map((item: any) => {
      return item.id;
    });
    const products = await this.product.findAll({
      where: {
        idproduct: items_id
      }
    });

    for (let item of body.items) {
      const product = products.filter((subitem: any) => {
        return subitem.idproduct === item.id;
      });
      total += product[0].price * item.count;
    }

    // Получение ссылки для оплаты
    const res = await axios({
      method: "POST",
      url: "https://securepay.tinkoff.ru/v2/Init",
      headers: { "Content-Type": "application/json" },
      data: {
        TerminalKey: process.env.TERMINAL_KEY,
        Amount: (total + this.delivery_cost) * 100,
        OrderId: order.idorder,
        Description: "",
        Frame: true,
        Language: "ru",
        DATA: {
          Email: body.email,
          Phone: body.phone,
          Name: body.name,
          connection_type: "Widget2.0"
        },
        Receipt: {
          Taxation: "usn_income_outcome",
          Phone: body.phone,
          Items: products
            .map((product: any) => {
              const item = body.items.filter((subitem: any) => {
                return subitem.id === product.idproduct; 
              })[0];
              return {
                Name: product.title,
                Price: product.price * 100,
                Quantity: item.count,
                Amount: product.price * item.count * 100,
                Tax: 'none'
              }
            }).concat([{
              Name: 'Доставка',
              Price: this.delivery_cost * 100,
              Quantity: 1,
              Amount: this.delivery_cost * 100,
              Tax: 'none'
            }])
        }
      }
    });

    this.response.result = true;
    this.response.data = {
      url: res.data.PaymentURL,
      delivery_cost: this.delivery_cost
    };
    return this.response;
  }

  // /**
  //  * @description Create new order
  //  * @param {number} idclient - client id
  //  * @param {Array.<number>} products - array with products id
  //  * @param {string} address - delivery address
  //  * @param {string} [delayed_datetime] - pending order date and time
  //  * @param {string} [comment] - order comment
  //  * @param {boolean} [paid] - order has been paid
  //  * @param {boolean} [debug=false] - debug mode
  //  */
  // public async create(query: any) {

  //   query.session = '123';

  //   // check of required parameters
  //   if (!query.session || !query.products || !query.address || !query.idclient) {
  //     if (query.debug) this.functions.paramsError();
  //     else this.functions.unknownError();
  //   } else if (!query.products.length) {
  //     if (query.debug) throw new Error('Заказ пуст');
  //     else this.functions.unknownError();
  //   }

  //   /**
  //    * there will be a function to get a client ID by session
  //    */

  //   let paid = 0;
  //   if (query.paid) paid = 1;

  //   const order_sql: string = `
  //     INSERT INTO ?? (idclient, idstate, address, comment, paid, start_datetime)
  //     VALUES ('${query.idclient}', '${(!paid) ? '1' : '2'}', '${query.address}', ${(!query.comment) ? 'NULL' : "'" + query.comment + "'"}, '${paid}', CURRENT_TIMESTAMP)
  //   `;

  //   const data: any = await this.Db.query(order_sql, [this.table.orders]);
  //   const idorder: number = data.insertId;

  //   if (idorder === 0) {
  //     this.functions.unknownError();
  //   }

  //   let data_sql: string = `INSERT INTO ?? (idorder, idproduct) VALUES `;

  //   let values: string[] = [];
  //   query.products.forEach((idproduct: number) => {
  //     values.push(`('${idorder}', '${idproduct}')`);
  //   });

  //   data_sql += values.join(', ');

  //   await this.Db.query(data_sql, [this.table.orders_data]);

  //   this.response.result = true;
    
  //   return this.response;
  // }

  // /**
  //  * @description Order state change
  //  * @param {number} idstate - state id
  //  * @param {number} idorder - order id
  //  */
  // public async setState(query: any) {
    
  //   // check of required parameters
  //   if (!query.idorder || !query.idstate) {
  //     if (query.debug) this.functions.paramsError();
  //     else this.functions.unknownError();
  //   } else if (isNaN(query.idorder) || isNaN(query.idstate)) {
  //     if (query.debug) throw new Error('idorder and idstate must be a number!');
  //     else this.functions.unknownError();
  //   }

  //   const idorder: number = parseInt(query.idorder);
  //   const idstate: number = parseInt(query.idstate);

  //   const sql: string = 'UPDATE ?? SET idstate = ? WHERE idorder = ?';
  //   const params: any[] = [this.table.orders, idstate, idorder];

  //   await this.Db.query(sql, params);

  //   this.response.result = true;

  //   return this.response;

  // }

  // /**
  //  * @description Get orders info
  //  * @param {string} [date_start=moment()] - start date
  //  * @param {string} [date_end=moment()] - end date
  //  * @param {number} [idorder] - order id
  //  * @param {number} [idclient] - client id
  //  * @param {number} [idcourier] - courier id
  //  * @param {boolean} [debug=false] - debug mode
  //  */
  // public async get(query: any) {

  //   // default values
  //   if (!query.date_start) query.date_start = moment().format('YYYY-MM-DD');
  //   if (!query.date_end) query.date_end = moment().format('YYYY-MM-DD');

  //   let params: any[] = [
  //     this.table.orders, 
  //     this.table.clients, 
  //     this.table.orders_data, 
  //     this.table.products, 
  //     this.table.categories, 
  //     this.table.orders_states, 
  //     query.date_start,
  //     query.date_end
  //   ];

  //   let restrictions: string[] = ['DATE(t1.start_datetime) BETWEEN ? AND ?'];

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

  //   const where_clause: any = (restrictions.length) ? restrictions.join(' AND ') : 1;

  //   const sql: string = `
  //     SELECT
  //       t1.*,
  //       t2.name AS client_name,
  //       t2.email AS client_email,
  //       t2.phone AS client_phone,
  //       t4.idproduct AS idproduct,
  //       t4.title AS product_title,
  //       t4.poster AS product_poster,
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
  //     ORDER BY t1.start_datetime DESC
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
  //         start_datetime: item.start_datetime,
  //         delayed_datetime: item.delayed_datetime,
  //         lead_datetime: item.lead_datetime,
  //         items: orderItems.map((item: any) => {
  //           return {
  //             idcategory: item.idcategory,
  //             category: item.category_name,
  //             category_icon: item.category_icon,
  //             idproduct: item.idproduct,
  //             product: item.product_title,
  //             poster: item.product_poster,
  //             price: item.product_price
  //           }
  //         })
  //       });
  //     }
  //   });

  //   this.response.result = true;
  //   this.response.data = modifdata;

  //   return this.response;

  // }
};