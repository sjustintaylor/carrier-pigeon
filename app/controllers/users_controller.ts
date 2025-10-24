import User from '#models/user'
import { loginValidator } from '#validators/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, session }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)

    await User.create({ username, password })
    session.flash('success', 'Account created successfully!')
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    // TODO: Can only update your own password
  }
}
