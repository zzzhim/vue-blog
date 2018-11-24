import koa from 'koa'
import cors from "koa-cors";
import bodyParser from 'koa-bodyparser'
import statics from 'koa-static'

// 打印日志
import logger from 'koa-logger'

// 路由文件
import router from "./router/index";

import query from './uitls/query'

const app = new koa()

app
    .use(logger())
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(statics(__dirname + '/static/Avatar'))

app.listen(4000,() => {
    console.log('node is ok')
})