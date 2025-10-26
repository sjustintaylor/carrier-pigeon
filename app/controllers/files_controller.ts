import { fileUploadValidator } from '#validators/file_upload'
import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'
import { getFriendlyId } from '../utils/get_friendly_id.js'
import env from '#start/env'
import FileRecord from '#models/file_record'
import { DateTime, Duration } from 'luxon'

const disk = drive.use()

export default class FilesController {
  /**
   * Display a list of files
   */
  async index({ auth, inertia, session }: HttpContext) {
    const user = await auth.authenticate()
    const duration = Duration.fromObject({ seconds: env.get('FILE_EXPIRY_SECONDS') })
    const cutoff = DateTime.now().minus(duration)
    const expiredFiles = await FileRecord.query()
      .where('created_at', '<', cutoff.toSQLDate())
      .andWhere('user_id', user.id)

    const activeFiles = await FileRecord.query()
      .where('created_at', '>', cutoff.toSQLDate())
      .andWhere('user_id', user.id)

    for (const file of expiredFiles) {
      await file.delete()
    }

    return inertia.render('files/list-files/list-files.page', {
      flash: {
        success: session.flashMessages.get('success'),
        error: session.flashMessages.get('error'),
      },
      values: activeFiles.map((el) => {
        return {
          id: el.storageIdentifier,
          expiresOn: el.createdAt.plus(duration).toJSDate(),
          filename: el.filename,
        }
      }),
    })
  }

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

    return response.send({
      url: disk.getSignedUploadUrl(storageIdentifier, {
        contentType,
        expiresIn: env.get('FILE_EXPIRY_SECONDS'),
      }),
    })
  }

  /**
   * Download an individual file
   */
  async show({ params, response, inertia }: HttpContext) {
    const file = await FileRecord.findByOrFail({ storageIdentifier: params.id })

    const duration = file.createdAt.diff(DateTime.now()).as('seconds')

    if (duration > env.get('FILE_EXPIRY_SECONDS')) {
      await file.delete()
      return response.notFound()
    }

    const url = await disk.getSignedUrl(file.storageIdentifier, {
      contentType: file.contentType,
      expiresIn: '30 mins',
      contentDisposition: `attachment; filename="${file.filename}"`,
    })
    return inertia.location(url)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const file = await FileRecord.findByOrFail({ storageIdentifier: params.id })
    await file.delete()
    return response.redirect().toRoute('files.index')
  }
}
