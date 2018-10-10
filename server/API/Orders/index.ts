import Main from '../../Main';
import Functions from '../../Main/Functions';
import moment from 'moment';

export default class Orders extends Main {  
  functions: Functions;
  response: responseAPI;
  table: tableList;
  [propName: string]: any;

  constructor() {
    super();
    this.functions = new Functions;

    this.response = {
      result: false
    };
    this.table = {
      orders: 'orders',
      orders_data: 'orders_data',
      orders_states: 'orders_states',
      clients: 'clients',
      products: 'products',
      categories: 'categories'
    };
  }

  /**
   * @description Create new order
   * @param {Array.<number>} products - array with products id
   * @param {string} address - delivery address
   * @param {string} [delayed_datetime] - pending order date and time
   * @param {string} [comment] - order comment
   * @param {boolean} [paid] - order has been paid
   * @param {boolean} [debug=false] - debug mode
   */
  public async create(query: any) {

    query.session = '123';

    // check of required parameters
    if (!query.session || !query.products || !query.address) {
      if (query.debug) this.functions.paramsError();
      else this.functions.unknownError();
    } else if (!query.products.length) {
      if (query.debug) throw new Error('Заказ пуст');
      else this.functions.unknownError();
    }

    /**
     * there will be a function to get a client ID by session
     */

    let idclient: number = 1;
    let paid = 0;
    if (query.paid) paid = 1;

    const order_sql: string = `
      INSERT INTO ?? (idclient, idstate, address, comment, paid, start_datetime)
      VALUES ('${idclient}', '${(!paid) ? '1' : '2'}', '${query.address}', ${(!query.comment) ? 'NULL' : "'" + query.comment + "'"}, '${paid}', CURRENT_TIMESTAMP)
    `;

    const data: any = await this.Db.query(order_sql, [this.table.orders]);
    const idorder: number = data.insertId;

    if (idorder === 0) {
      this.functions.unknownError();
    }

    let data_sql: string = `INSERT INTO ?? (idorder, idproduct) VALUES `;

    let values: string[] = [];
    query.products.forEach((idproduct: number) => {
      values.push(`('${idorder}', '${idproduct}')`);
    });

    data_sql += values.join(', ');

    await this.Db.query(data_sql, [this.table.orders_data]);

    this.response.result = true;
    
    return this.response;
  }

  /**
   * @description order state change
   * @param {number} idstate - state id
   * @param {number} idorder - order id
   */
  public async setState(query: any) {
    
    // check of required parameters
    if (!query.idorder || !query.idstate) {
      if (query.debug) this.functions.paramsError();
      else this.functions.unknownError();
    } else if (isNaN(query.idorder) || isNaN(query.idstate)) {
      if (query.debug) throw new Error('idorder and idstate must be a number!');
      else this.functions.unknownError();
    }

    const idorder: number = parseInt(query.idorder);
    const idstate: number = parseInt(query.idstate);

    const sql: string = 'UPDATE ?? SET idstate = ? WHERE idorder = ?';
    const params: any[] = [this.table.orders, idstate, idorder];

    await this.Db.query(sql, params);

    this.response.result = true;

    return this.response;

  }

  /**
   * @description Get orders info
   * @param {string} [date_start=moment().format('YYYY-MM-DD')] - start date
   * @param {string} [date_end=moment().format('YYYY-MM-DD')] - end date
   * @param {number} [idorder] - order id
   * @param {boolean} [debug=false] - debug mode
   */
  public async get(query: any) {

    // default values
    if (!query.date_start) query.date_start = moment().format('YYYY-MM-DD');
    if (!query.date_end) query.date_end = moment().format('YYYY-MM-DD');

    let restrictions: string[] = ['DATE(t1.start_datetime) BETWEEN ? AND ?'];

    if (query.idorder) {
      restrictions.push(`t1.idorder = ?`);
    }

    const where_clause: any = (restrictions.length) ? restrictions.join(' AND ') : 1;

    const sql: string = `
      SELECT
        t1.*,
        t2.name AS client_name,
        t2.email AS client_email,
        t2.phone AS client_phone,
        t4.idproduct AS idproduct,
        t4.title AS product_title,
        t4.poster AS product_poster,
        t4.price AS product_price,
        t5.idcategory AS idcategory,
        t5.name AS categoy_name,
        t5.icon AS category_icon,
        t6.name AS state
      FROM ?? AS t1
      INNER JOIN ?? AS t2 ON t1.idclient = t2.idclient
      INNER JOIN ?? AS t3 ON t1.idorder = t3.idorder
      INNER JOIN ?? AS t4 ON t3.idproduct = t4.idproduct
      INNER JOIN ?? AS t5 ON t4.idcategory = t5.idcategory
      INNER JOIN ?? AS t6 ON t1.idstate = t6.idstate
      WHERE ${where_clause}
      ORDER BY t1.start_datetime DESC
    `;

    const params: any[] = [
      this.table.orders, 
      this.table.clients, 
      this.table.orders_data, 
      this.table.products, 
      this.table.categories, 
      this.table.orders_states, 
      query.date_start,
      query.date_end,
      query.idorder
    ];

    const data: any = await this.Db.query(sql, params);

    let idorders: number[] = [];
    let modifdata: any[] = [];

    data.forEach((item: any) => {
      if (idorders.indexOf(item.idorder) === -1) {
        idorders.push(item.idorder);
        let orderItems: any[] = data.filter((subitem: any) => {
          return subitem.idorder === item.idorder;
        });

        modifdata.push({
          idorder: item.idorder,
          idclient: item.idclient,
          client_name: item.client_name,
          client_email: item.client_email,
          client_phone: item.client_phone,
          idstate: item.idstate,
          state: item.state,
          address: item.address,
          comment: item.comment,
          paid: item.paid,
          start_datetime: item.start_datetime,
          delayed_datetime: item.delayed_datetime,
          lead_datetime: item.lead_datetime,
          items: orderItems.map((item: any) => {
            return {
              idcategory: item.idcategory,
              category: item.category_name,
              category_icon: item.category_icon,
              idproduct: item.idproduct,
              product: item.product_title,
              poster: item.product_poster,
              price: item.product_price
            }
          })
        });
      }
    });

    this.response.result = true;
    this.response.data = modifdata;

    return this.response;

  }
};