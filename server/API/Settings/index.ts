/**
 * Class for work with settings
 * @author Nikita Bersenev
 */

import DB from '../../Vendor/DateBase';
import Functions from '../../Vendor/Functions';

export default class Settings {

  functions: Functions;
  response: ResponseInterface;
  [propName: string]: any;

  constructor() {
    this.functions = new Functions;

    this.response = {
      result: false 
    }
  }

  public async getAll(params: any) { // get all settings

    /**
     * REQUIRED:
     * @param idproject - project id
     * OPTIONAL:
     * @param debug - debug mode
     */
    
    // used tables
    const t_settings: string = 'settings';

    // check of required parameters
    if (!params.idproject) {
      if (params.debug) this.functions.paramsError();
      else this.functions.unknownError();
    }  
    
    const sql: string = `
      SELECT
        idsetting,
        name, 
        value,
        start_date,
        end_date
      FROM ${t_settings}
      WHERE CURDATE() BETWEEN start_date AND end_date
    `;

    const data: any = await new DB().query(sql);

    this.response.result = true;
    this.response.data = data;

    return this.response;

  }

  public async get(params: any) { // get setting by name

    /**
     * REQUIRED:
     * @param idproject - project id
     * @param name - setting name
     * OPTIONAL:
     * @param debug - debug mode
     */

    // used tables
    const t_settings: string = 'settings';

    // check of required parameters
    if (!params.idproject || !params.name) {
      if (params.debug) this.functions.paramsError();
      else this.functions.unknownError();
    }  

    const sql: string = `
      SELECT
        idsetting,
        name,
        value,
        start_date,
        end_date
      FROM ${t_settings}
      WHERE name = '${params.name}'
        AND CURDATE() BETWEEN start_date AND end_date
    `;

    const data: any = await new DB().query(sql);

    this.response.result = true;
    this.response.data = data;

    return data;

  }

}

interface ResponseInterface {
  result: boolean;
  [propName: string]: any;
}