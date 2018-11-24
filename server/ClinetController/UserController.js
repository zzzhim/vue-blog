import md5 from 'md5'
import createToken from '../uitls/createToken'
import user from '../clientModel/UserModel'
import Article from '../clientModel/ArticleModel'
import nanoid from 'nanoid'
import fs from 'fs'

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
                        token: createToken(),
                        username
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
                    token: createToken(),
                    username,
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

    async homeImg(ctx) {
        const {data, username} = ctx.request.body
        const res = await user.getUserByName(username)

        if (res.length !== 0) {

            // 上传文件到阿里云OSS
            // await client.put(fileName, __dirname + `/imgs/${fileName}`);
            const base64 = await data.replace(/^data:image\/\w+;base64,/, "")//去掉图片base64码前面部分data:image/png;base64
            const dataBuffer = await new Buffer(base64, 'base64') //把base64码转成buffer对象，

            const fileName = nanoid() + '.png'

            fs.writeFile(__dirname + '/../static/Avatar/' + fileName, dataBuffer, function (err) {
                if (err) {
                    console.log(err)
                }
            })

            await user.updateAvatar(fileName, username)

            ctx.body = {
                success: true,
                message: '更换头像成功',
                ImgUrl: fileName
            }
        }else {
            ctx.body = {
                success: false,
                message: '用户不存在'
            }
        }
    }

    // 头像
    async getUrlPath(ctx) {
        const { username } = ctx.request.query
        const res = await user.getUserByName(username)

        if (res.length !== 0) {
            ctx.body = {
                success: true,
                ImgUrl: res[0].avatar
            }
        }else {
            ctx.body = {
                success: false,
            }
        }
    }
}

export default new UserController()