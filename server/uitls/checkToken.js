import jwt from 'jsonwebtoken'
import { secret } from '../config'

export default async ( ctx, next ) => {
  const XToken = ctx.get('X-Token')

  const bool = await new Promise(async (resolve, reject) => {
    try {
      await jwt.verify(XToken, secret);     //如果token过期或验证失败，将抛出错误
      resolve(true)
    } catch (err) {
      reject(false)
    }
  })

  if(bool) {
    await next()
  }else {
    ctx.body = {
      code: 401,
      success: false,
      message: ' 请登录'
    }
  }
}