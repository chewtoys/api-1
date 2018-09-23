"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DB {
    constructor() {
        const mysql = require('mysql');
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: 'node3.ortant.ru',
            user: 'savin',
            password: 'xPzWMvFloghs3mjJ',
            database: 'savin_kfcdelivery',
            dateStrings: true
        });
    }
    execute(sql, params) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err)
                    return reject(err);
                if (typeof params !== 'undefined') {
                    connection.query(sql, params, (err, res, fields) => {
                        connection.release();
                        if (err)
                            return reject(err);
                        return resolve(res);
                    });
                }
                else {
                    connection.query(sql, (err, res, fields) => {
                        connection.release();
                        if (err)
                            return reject(err);
                        return resolve(res);
                    });
                }
            });
        });
    }
}
exports.default = new DB();
//# sourceMappingURL=DB.js.map