/**
 * Класс для работы с БД
 * @author Nikita Bersenev
 */

class DB {

  pool: any

  constructor () {
    const mysql = require('mysql')

    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'node3.ortant.ru',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: 'kfc_delivery',
      dateStrings: true
    })
  }

  execute(sql: string, params?: string[]) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err: any, connection: any) => {
        if (err) return reject(err)

        if (typeof params !== 'undefined') {
          connection.query(sql, params, (err: any, res: any, fields: any) => {
            connection.release()

            if (err) return reject(err)

            return resolve(res)
          })
        } else {
          connection.query(sql, (err: any, res: any, fields: any) => {
            connection.release()

            if (err) return reject(err)

            return resolve(res)
          })
        }
      })
    })
  }

}

export default new DB()