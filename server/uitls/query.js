// 首先连接mysql数据库
import mysql from "mysql"
import { db, dbName } from "../config"
import fs from 'fs'
import path from 'path'
let pool = null

// 需要创建一个数据库,并且能够将sql文件夹下的sql文件执行
const sqlContent = fs.readFileSync(path.resolve(__dirname, '..', './sql/ashen_db.sql'), 'utf-8')

// 第一次连接数据库的时候,没有指定数据库名称,这次连接的目的是为了能够创建一个vue——blog的数据库
// 并且将数据库文件执行,执行完毕后vue_blog数据库就有对应的表和数据了
const init = mysql.createConnection(db)

init.connect()
init.query('CREATE DATABASE vue_blog', err => {
    Object.assign(db, dbName)

    // 第二次连接数据库,这时候,数据库vue_blog已经创建成功了,这时候,直接连接vue_blog数据库
    // 然后执行sql文件夹下的vue_blog
    pool = mysql.createPool(db)
    if(err) {
        console.log('vue_blog database created already');
    }else {
        console.log('CREATE vue_blog DATABASE');
        query(sqlContent).then(res => {
            console.log('import sql is success');
        }).catch(err => {
            console.log('import sql is error');
            console.log(err);
        })
    }
})
init.end()

// 封装一个query方法,方便我们进行sql语句的执行
export default function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                    connection.release()
                })
            }
        })
    })
}