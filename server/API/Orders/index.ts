import Main from '../../Main';
import Functions from '../../Main/Functions';
import { parse } from 'url';

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
      orders: "orders",
      orders_data: "orders_data",
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
};