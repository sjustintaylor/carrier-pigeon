import { fileUploadValidator } from '#validators/file_upload'
import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'
import { getFriendlyId } from '../utils/get_friendly_id.js'
import env from '#start/env'
import FileRecord from '#models/file_record'

const disk = drive.use()

export default class FilesController {
  /**
   * Display a list of files
   */
  async index({}: HttpContext) {}

  /**
   * Display form to upload a new file
   */
  async create({ inertia, session }: HttpContext) {
    return inertia.render('files/upload-file/upload-file.page', {
      flash: {
        success: session.flashMessages.get('success'),
        error: session.flashMessages.get('error'),
      },
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()
    const { contentType, filename } = await request.validateUsing(fileUploadValidator)
    const storageIdentifier = getFriendlyId()
    await FileRecord.create({
      contentType,
      filename,
      storageIdentifier,
      userId: user.id,
    })

    return response.json({
      url: disk.getSignedUploadUrl(storageIdentifier, {
        contentType,
        expiresIn: env.get('FILE_EXPIRY_SECONDS'),
      }),
    })
  }

  /**
   * Download an individual file
   */
  async show({ params }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
