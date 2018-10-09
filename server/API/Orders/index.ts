import Main from '../../Main';
import Functions from '../../Main/Functions';

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
  public async create(params: any) {

    params.session = '123';

    // check of required parameters
    if (!params.session || !params.products || !params.address) {
      if (params.debug) this.functions.paramsError();
      else this.functions.unknownError();
    } else if (!params.products.length) {
      if (params.debug) throw new Error('Заказ пуст');
      else this.functions.unknownError();
    }

    /**
     * there will be a function to get a client ID by session
     */

    let idclient: number = 1;
    let paid = 0;
    if (params.paid) paid = 1;

    const order_sql: string = `
      INSERT INTO ?? (idclient, idstate, address, comment, paid, start_datetime)
      VALUES ('${idclient}', '${(!paid) ? '1' : '2'}', '${params.address}', ${(!params.comment) ? 'NULL' : "'" + params.comment + "'"}, '${paid}', CURRENT_TIMESTAMP)
    `;

    const data: any = await this.Db.query(order_sql, [this.table.orders]);
    const idorder: number = data.insertId;

    if (idorder === 0) {
      this.functions.unknownError();
    }

    let data_sql: string = `INSERT INTO ?? (idorder, idproduct) VALUES `;

    let values: string[] = [];
    params.products.forEach((idproduct: number) => {
      values.push(`('${idorder}', '${idproduct}')`);
    });

    data_sql += values.join(', ');

    await this.Db.query(data_sql, [this.table.orders_data]);

    this.response.result = true;
    
    return this.response;
  };
};