/**
 * Class for work with orders
 * @author Nikita Bersenev
 */

import DB from '../../Vendor/DB';
import Functions from '../../Vendor/Functions';

export default class Orders {
  
  functions: Functions;
  response: ResponseInterface;
  [propName: string]: any;

  constructor() {
    this.functions = new Functions;

    this.response = {
      result: false
    }
  }

  public async create(params: any) { // create new order

    /**
     * REQUIRED:
     * @param products - array with products id
     * @param address - delivery address
     * OPTIONAL:
     * @param delayed_datetime - pending order date and time
     * @param comment - order comment
     * @param paid - order has been paid
     * @param debug - debug mode
     */

    // used tables
    const t_orders: string = 'orders';
    const t_orders_data: string = 'orders_data';

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
      INSERT INTO ${t_orders} (idclient, idstate, address, comment, paid, start_datetime)
      VALUES ('${idclient}', '${(!paid) ? '1' : '2'}', '${params.address}', ${(!params.comment) ? 'NULL' : "'" + params.comment + "'"}, '${paid}', CURRENT_TIMESTAMP)
    `;

    const data: any = await new DB().query(order_sql);
    const idorder: number = data.insertId;

    if (idorder === 0) {
      this.functions.unknownError();
    }

    let data_sql: string = `INSERT INTO ${t_orders_data} (idorder, idproduct) VALUES `;

    let values: string[] = [];
    params.products.forEach((idproduct: number) => {
      values.push(`('${idorder}', '${idproduct}')`);
    });

    data_sql += values.join(', ');

    await new DB().query(data_sql);

    this.response.result = true;
    
    return this.response;

  }

}

interface ResponseInterface {
  result: boolean;
  [propName: string]: any;
}