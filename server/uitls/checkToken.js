import jwt from 'jsonwebtoken'
import { secret } from '../config'

export default async ( ctx, next ) => {
  const XToken = ctx.get('X-Token')
  if (XToken === '') {
    ctx.throw(401, "no token detected in http header 'X-Token'")
  }

  try {
    await jwt.verify(XToken, secret);     //如果token过期或验证失败，将抛出错误
    await next();
  }catch(err){
    ctx.body = {
      code: 401,
      success: false,
      message: ' 请登录'
    }
  }
}