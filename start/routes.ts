/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
import UsersController from '#controllers/users_controller'
import ProductsController from '#controllers/products_controller'

router.post('/auth/register', [UsersController, 'register'])
router.post('/auth/login', [UsersController, 'login'])

router.get('/items', [ProductsController, 'index'])
router.get('/items/:id', [ProductsController, 'show'])

router.group(() => {
  router.get('/profile', [UsersController, 'profile'])
  router.post('/items', [ProductsController, 'store'])
  router.delete('/items/:id', [ProductsController, 'destroy'])
  router.put('/items/:id', [ProductsController, 'update'])
}).middleware(middleware.authJwt())

