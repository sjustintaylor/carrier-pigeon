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

router.get('/downloads/:id', '#controllers/files_controller.show').as('download')

// Authentication routes (for guests only)
router
  .group(() => {
    router.get('/login', '#controllers/authentication_controller.show').as('login')
    router.post('/login', '#controllers/authentication_controller.update').use(authThrottle)
  })
  .use(middleware.guest())

// Protected routes (for authenticated users only)
router
  .group(() => {
    router.post('/logout', '#controllers/authentication_controller.destroy').as('logout')
    router
      .resource('files', '#controllers/files_controller')
      .only(['index', 'create', 'store', 'destroy'])
    router
      .resource('users', '#controllers/users_controller')
      .only(['create', 'store', 'edit', 'update'])
      .as('users')
  })
  .use(middleware.auth())
