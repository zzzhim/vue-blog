import koa from 'koa'
import cors from "koa-cors";
import bodyParser from 'koa-bodyparser'

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

app.listen(4000,() => {
    console.log('node is ok')
})