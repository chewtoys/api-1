/**
 * Класс для работы с БД
 * @author Nikita Bersenev
 */
import mysql from 'mysql';

export default class DB {
  pool: any;

  constructor () {
    if(!process.env.MYSQL_USER) throw `EXPORT MYSQL_USER=''`;
    if(!process.env.MYSQL_PASSWORD) throw `EXPORT MYSQL_PASSWORD=''`;
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: "node3.ortant.ru",
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: "kfc",
      dateStrings: true
    })
  }

  query(sql: string, params?: string[]) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err: mysql.MysqlError, res: any) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  };
};