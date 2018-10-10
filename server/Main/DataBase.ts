/**
 * Класс для работы с БД
 * @author Nikita Bersenev
 */
import mysql, { Pool } from "mysql";
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "node3.ortant.ru",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "kfc",
    dateStrings: true
});

export default class DB {
    pool: Pool;

    constructor() {
        if (!process.env.MYSQL_USER) throw `You need to add to .env file: MYSQL_USER=''`;
        if (!process.env.MYSQL_PASSWORD) throw `You need to add to .env file: MYSQL_PASSWORD=''`;
        this.pool = pool;
    };

    query(sql: string, params?: string[]) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) return reject(err);
                connection.query(sql, params, (err: mysql.MysqlError, res: any) => {
                    connection.release();
                    if (err) return reject(err);
                    return resolve(res);
                });
            });
        });
    };    
};