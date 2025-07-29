import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import jwtConfig from '#config/jwt'
import User from '#models/user'

export default class AuthJwtMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx

    const authHeader = request.header('Authorization')
    if (!authHeader) {
      return response.unauthorized('message: No authorization header provided')
    }

    const token = authHeader.replace('Bearer ', '')

    try {
      const payload = jwt.verify(token, jwtConfig.secret) as JwtPayload
      
      const user = await User.find(payload.id)
      if (!user) {
        return response.unauthorized('message: User not found')
      }

      request.updateBody({
        ...request.body(),
        authUser: user
      })

      return next()
    } catch (error) {
      return response.unauthorized('message: Invalid token')
    }
  }
}