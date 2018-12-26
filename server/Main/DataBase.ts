/**
 * Класс для работы с БД
 * @author Nikita Bersenev
 */
import mysql from "mysql2";
import { Client } from "ssh2";
import fs from "fs";
import path from "path";

let connection: mysql.Connection;

const query = (sql: string, params?: string[]) =>
  new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "development") {
      const ssh = new Client();

      ssh
        .on("ready", () => {
          // console.log("Client :: ready");
          ssh.forwardOut(
            "localhost",
            3007,
            "localhost",
            3306,
            (err, stream) => {
              if (err) reject(err);
              const option = {
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                stream: stream
              };
              connection = mysql.createConnection(option);

              connection.query(
                sql,
                params,
                (err: mysql.QueryError, res: any) => {
                  if (err) reject(err);
                  resolve(res);
                }
              );
            }
          );
        })
        .connect({
          host: "laapl.ru",
          port: 22,
          username: "laapl",
          privateKey: fs.readFileSync(path.resolve(process.cwd(), "key/id_rsa"))
        });
    } else {
      const option = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
      };
      connection = mysql.createConnection(option);

      connection.query(sql, params, (err: mysql.QueryError, res: any) => {
        if (err) reject(err);
        resolve(res);
      });
    }
  });

export default class DB {
  constructor() {}
  query = async (sql: string, params?: string[]) => await query(sql, params);
}
