import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
    vine.object({
        email: vine.string().email().maxLength(255),
        password: vine.string().minLength(6).maxLength(180),
    })
)

export const loginUserValidator = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string()
    })
)
