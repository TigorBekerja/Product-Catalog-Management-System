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

router.post('/auth/register', [UsersController, 'register'])
router.post('/auth/login', [UsersController, 'login'])

router.group(() => {
  router.get('/profile', [UsersController, 'profile'])
}).middleware(middleware.authJwt())

