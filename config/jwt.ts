import env from '#start/env'

export default {
    secret: env.get('JWT_SECRET', 'default_secret'),
    expiresIn: '1d'
}