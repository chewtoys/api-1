/**
 * Класс для работы с БД
 * @author Nikita Bersenev
 */
import mysql from "mysql2";
import { Client } from "ssh2";
import fs from "fs";
import path from "path";
let connection: mysql.Pool | any;

if (process.env.NODE_ENV === "development") {
  // Прокидывает тунель и отдает промис с соединением
  // Костыль для локальной разработки, такой же в методе query
  connection = new Promise((resolve, reject) => {
    const ssh = new Client();

    ssh
      .on("ready", () => {
        ssh.forwardOut("localhost", 3007, "localhost", 3306, (err, stream) => {
          if (err) reject(err);
          const option = {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            stream: stream,
          };
          resolve(mysql.createConnection(option));
        });
      })
      .connect({
        host: "laapl.ru",
        port: 22,
        username: "laapl",
        privateKey: fs.readFileSync(path.resolve(process.cwd(), "key/id_rsa")), //Нужно положить приватный ключ в папку key и назвать его id_rsa
      });
  });
} else {
  const option = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  };
  connection = mysql.createPool(option);
}

export default class DB {
  /**
   *
   * @param {string} sql SQL код
   * @param {any[]} [params] Переменные для экранизации
   */
  async query(sql: string, params?: any[]) {
    if (process.env.NODE_ENV === "development") {
      const con: any = await connection;
      return new Promise((resolve, reject) => {
        con.query(sql, params, (err: mysql.QueryError, res: mysql.RowDataPacket) => {
          if (err) reject(err);
          resolve(res);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        connection.query(sql, params, (err: mysql.QueryError, res: mysql.RowDataPacket) => {
          if (err) reject(err);
          resolve(res);
        });
      });
    }
  }
}
