/**
 * Класс для работы с БД
 * @author Nikita Bersenev
 */
import mysql from "mysql";
const option = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};
const pool = mysql.createPool(option);

export default class DB {
  /**
   *
   * @param {string} sql SQL код
   * @param {any[]} [params] Переменные для экранизации
   */
  async query(sql: string, params?: any[]) {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (err: mysql.MysqlError, res: mysql.FieldInfo) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
}
