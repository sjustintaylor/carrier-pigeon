import User from '#models/user'
import { createUserValidator } from '#validators/create_user'
import { loginValidator } from '#validators/login'
import { updatePasswordValidator } from '#validators/update_password'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display form to create a new record
   */
  async create({ inertia, session }: HttpContext) {
    return inertia.render('users/add-user/add-user.page', {
      flash: {
        success: session.flashMessages.get('success'),
        error: session.flashMessages.get('error'),
      },
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session }: HttpContext) {
    const { username, password } = await request.validateUsing(createUserValidator)

    await User.create({ username, password })
    session.flash('success', 'Account created successfully!')
  }

  /**
   * Edit individual record
   */
  async edit({ auth, inertia, session }: HttpContext) {
    const user = await auth.authenticate()
    return inertia.render('users/update-user/update-user.page', {
      flash: {
        success: session.flashMessages.get('success'),
        error: session.flashMessages.get('error'),
      },
      values: {
        id: user.id,
        username: user.username,
      },
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, auth, session, response }: HttpContext) {
    const user = await auth.authenticate()
    const { password } = await request.validateUsing(updatePasswordValidator)

    await User.updateOrCreate({ id: user.id }, { password })

    session.flash(
      'success',
      'Your password has been successfully updated. You can now log in with your new password.'
    )
    await auth.use('web').logout()
    return response.redirect().toRoute('login')
  }
}
