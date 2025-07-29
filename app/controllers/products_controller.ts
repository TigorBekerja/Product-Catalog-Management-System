import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { createProductSchema, updateProductSchema } from '#validators/product'

export default class ProductsController {
    public async index({request, response}:  HttpContext) {
        const page = request.input('page', 1)
        const limit = request.input('limit', 10)

        const products = await Product.query().paginate(page, limit)

        const json = products.toJSON()
        console.log(
            json.meta.currentPage 
        )
        return response.ok(
            {
                items:json.data,
                total: json.meta.total,
                page: json.meta.currentPage,
                totalPages: json.meta.lastPage
            }
        )
    }

    public async store({request, response} : HttpContext) {
        const body = request.body()
        const payload = {
            name: body.name,
            type: body.type,
            description: body.description,
            price: body.price,
        }
        const user = body.authUser

        const {error, value} = createProductSchema.validate(payload, { abortEarly: false })

        if (error) throw error

        const product = await Product.create({
            ...value,
            userId: user.id
        })
        return response.created({message: 'Product created', product})
    }

    public async show({params , response} : HttpContext) {
        const product = await Product.find(params.id)
        if (!product) {
            return response.notFound({message: 'Product not found'})
        }
        return response.ok(product)
    }

    public async update({params, request, response} : HttpContext) {
        const user = await request.body().authUser
        const product = await Product.find(params.id)
        if (!product) {
            return response.notFound({message: 'Product not found'})
        }
        if (product.userId != user.id) {
            return response.unauthorized({message: 'Access denied'})
        }
        const body = request.body()
        const payload = {
            name: body.name,
            type: body.type,
            description: body.description,
            price: body.price,
        }
        const {error, value} = updateProductSchema.validate(payload, { abortEarly: false })
        if (error) throw error

        product.merge(value)
        await product.save()
        return response.ok({message: 'product updated', product})
    }

    public async destroy({params, request, response} : HttpContext) {
        const user = await request.body().authUser
        const product = await Product.find(params.id)
        if (!product) {
            return response.notFound({message: 'Product not found'})
        }
        if (product.userId != user.id) {
            return response.unauthorized({message: 'Access Denied'})
        }

        await product.delete()
        return response.ok({message: 'Product deleted'})
    }
}