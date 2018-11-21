import md5 from 'md5'
import createToken from '../uitls/createToken'
import user from '../clientModel/UserModel'
import Article from '../clientModel/ArticleModel'

class UserController {

    async registered(ctx) {
        let { pass, checkPass, username, email } = ctx.request.body

        if(pass === checkPass) {
            // 查询用户名是否存在
            const res = await user.getUserByName(username)

            if(res.length === 0) {

                let password = md5(md5(md5(pass)))
                try{
                    await Article.addArticle(username, password, email)
                    ctx.body = {
                        success: true,
                        message: '注册成功',
                        token: createToken()
                    }
                }catch(err) {
                    console.log(err);
                    ctx.body = {
                        success: false,
                        message: '注册失败请重新注册'
                    }
                }
            }else {
                ctx.body = {
                    success: false,
                    message: '账号已存在请重新注册'
                }
            }
        }else {
            ctx.body = {
                success: false,
                message: '两次密码不一致'
            }
        }
    }

    async login(ctx) {
        let { username, password } = ctx.request.body
        // 判断用户是否存在
        const res = await user.getUserByName(username)
        if (res.length !== 0) {

            password = md5(md5(md5(password)))
            // 密码是否正确
            if(password === res[0].password) {
                ctx.body = {
                    success: true,
                    message: '登录成功',
                    token: createToken()
                }
            }else {
                ctx.body = {
                    success: false,
                    message: '账户或密码不正确'
                }
            }
        } else {
            ctx.body = {
                success: false,
                message: '账户或密码不正确'
            }
        }
        

    }
}

export default new UserController()