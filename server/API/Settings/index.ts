import Main from '../../Main';
import Functions from '../../Main/Functions';

export default class Settings extends Main {
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
      settings: "settings"
    };
  };

  /**
   * @description Get all settings
   * @param params 
   */
  public async getAll(params: any) {

    /**
     * REQUIRED:
     * @param idproject - project id
     * OPTIONAL:
     * @param debug - debug mode
     */

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
      FROM ??
      WHERE CURDATE() BETWEEN start_date AND end_date
    `;

    const data: any = await this.Db.query(sql, [this.table.settings]);

    this.response.result = true;
    this.response.data = data;

    return this.response;
  };

  /**
   * @description Get setting by name
   * @param params 
   */
  public async get(params: any) {

    /**
     * REQUIRED:
     * @param idproject - project id
     * @param name - setting name
     * OPTIONAL:
     * @param debug - debug mode
     */


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
      FROM ??
      WHERE name = '${params.name}'
        AND CURDATE() BETWEEN start_date AND end_date
    `;

    const data: any = await this.Db.query(sql, [this.table.settings]);

    this.response.result = true;
    this.response.data = data;

    return this.response;
  };
};