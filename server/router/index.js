import Router from "koa-router"
import { base_API } from '../config'

// 引入我们的登录注册控制器
import UserController from '../Controller/UserController'
// 引入验证token合法性的方法
import checkToken from '../uitls/checkToken'
// 引入文章相关的控制器
import ArticleController from '../Controller/ArticleController'

// 引入展示页面登录注册器
import ClientUserController from '../ClinetController/UserController'
import GetArticleController from '../ClinetController/GetArticleController'

const router = new Router()

// 前端所有的请求发过来的时候都是http://localhost:3000/api/......

// router.get('/', async (ctx, next) => {
//     ctx.body = '欢迎使用vue-blog接口测试服务器!!!'
// })

// 所有的路由都写在这里就可以了
// 前端所有的请求发过来的时候都是http://localhost:3000/api/......
router.prefix(`${base_API}`)

// 登出
// 只要是登录后才能看到的内容都需要验证一下token的合法性
router.get('/logOut', checkToken, UserController.logOut)
// 获取所有的文章
router.get('/articles', checkToken, ArticleController.getArticles)
// 查询一下最新发布的那篇文章的详细信息
router.get('/articles/:id', checkToken, ArticleController.getOneArticle)

// 登录
router.post('/login', UserController.login)
// 添加一篇新文章
router.post('/articles/add', checkToken, ArticleController.addArticle)
//更新一篇新的文章
router.post('/articles/update/:id', checkToken, ArticleController.updateArticle)
// 删除一篇文章
router.delete('/articles/del/:id', checkToken, ArticleController.deleteArticle)
// 发布文章
router.put('/articles/publish/:id', checkToken, ArticleController.publishArticle)


// 展示页面
router.post('/client/registered', ClientUserController.registered)
router.post('/client/login', ClientUserController.login)

router.get('/client/home', GetArticleController.GetHome)

router.get('/client/articles', GetArticleController.GetArticles)

router.get('/client/archive', GetArticleController.GetArchive)

router.get('/client/tags', GetArticleController.GetTags)

router.get('/client/readList', GetArticleController.GetReadList)

export default router