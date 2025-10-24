import User from '#models/user'
import { loginValidator } from '#validators/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthenticationController {
  /**
   * Show login page
   */
  async show({ inertia, session }: HttpContext) {
    return inertia.render('login/login.page', {
      flash: {
        success: session.flashMessages.get('success'),
        error: session.flashMessages.get('error'),
      },
    })
  }

  /**
   * Handle form submission for login
   */
  async update({ request, response, auth, session }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(username, password)
    await auth.use('web').login(user)

    session.flash('success', 'Welcome back!')
    return response.redirect().toRoute('files')
  }

  /**
   * Destroy user session
   */
  async destroy({ response, auth, session }: HttpContext) {
    await auth.use('web').logout()

    session.flash('success', 'You have been logged out successfully!')
    return response.redirect().toRoute('login')
  }
}
