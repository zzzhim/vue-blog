import jwt from 'jsonwebtoken'
import { secret } from '../config'

export default async ( ctx, next ) => {
  const XToken = ctx.get('X-Token')

    try {
      await jwt.verify(XToken, secret);     //如果token过期或验证失败，将抛出错误
      await next()
    } catch (err) {
      if (err.message == 'jwt expired') {
        ctx.body = {
          code: 401,
          message: 'token已过期,请重新登录'
        }
      } else {
        ctx.throw(500) //直接抛出500的错误,在所有加上checkToken的代码里面.
        //抛给了前端的response拦截器了....
      }
    }
}