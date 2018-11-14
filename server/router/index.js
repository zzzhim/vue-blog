import Router from "koa-router"
import { base_API } from '../config'

// 引入我们的登录注册控制器
import UserController from '../Controller/UserController'
// 引入验证token合法性的方法
import checkToken from '../uitls/checkToken'
const router = new Router()

// 前端所有的请求发过来的时候都是http://localhost:3000/api/......

router.get('/', async (ctx, next) => {
    ctx.body = '欢迎使用vue-blog接口测试服务器!!!'
})

// 所有的路由都写在这里就可以了
// 前端所有的请求发过来的时候都是http://localhost:3000/api/......
router.prefix(`${base_API}`)

router.get('/', async ctx => {
    ctx.body = '我是首页的接口'
})

// 登录
router.post('/login', UserController.login)
// 登出
// 只要是登录后才能看到的内容都需要验证一下token的合法性
router.get('/logOut', checkToken, UserController.logOut)

export default router