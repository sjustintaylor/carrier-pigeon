/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { authThrottle } from './limiter.js'

router.on('/').renderInertia('home').use(middleware.guest())

router.post('/users', '#controllers/#controllers/users_controller.store')

// Authentication routes (for guests only)
router
  .group(() => {
    router.get('/login', '#controllers/authentication_controller.show').as('login')
    router
      .post('/login', '#controllers/common/auth/authentication_controller.update')
      .use(authThrottle)
  })
  .use(middleware.guest())

// Protected routes (for authenticated users only)
router
  .group(() => {
    router.post('/logout', '#controllers/authentication_controller.destroy').as('logout')
    router.on('/files').renderInertia('files').as('consumer')
  })
  .use(middleware.auth())
