import type { HttpContext } from '@adonisjs/core/http'

export default class FilesController {
  /**
   * Display a list of files
   */
  async index({}: HttpContext) {}

  /**
   * Display form to upload a new file
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Download an individual file
   */
  async show({ params }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
