import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import jwt from 'jsonwebtoken'
import jwtConfig from '#config/jwt'
import Hash from '@adonisjs/core/services/hash'
import { loginUserValidator, registerUserValidator } from '#validators/user'
import { validationMessages } from '#validators/messages'

export default class UsersController {
    public async register({ request, response }: HttpContext) {
        const userData = await request.validateUsing(registerUserValidator, {
            messagesProvider: validationMessages
        })

        const exist = await User.findBy('email', userData.email)
        if (exist) {
            return response.conflict({ message: 'Email already registered' })
        }


        try {
            const newUser = await User.create(userData)
            return response.created(newUser)
        } catch (error) {
            return response.badRequest('message: ' + error.message)
        }
    }
    public async login({ request, response }: HttpContext) {
        const { email, password } = await request.validateUsing(loginUserValidator)

        const user = await User.findBy('email', email)
        if (!user) {
            return response.badRequest('message: User not found')
        }
        const passwordMatch = await Hash.verify(user.password, password)
        if (!passwordMatch) {
            return response.badRequest('message: Invalid credentials')
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            jwtConfig.secret as jwt.Secret,
            { expiresIn: jwtConfig.expiresIn as jwt.SignOptions['expiresIn'] }
        )

        return response.ok({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    }
    public async profile({ request, response }: HttpContext) {
        const user = request.body().authUser

        if (!user) {
            return response.unauthorized('message: User not authenticated')
        }

        return response.ok({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    }

}