import FileRecord from '#models/file_record'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { getFriendlyId } from '../../app/utils/get_friendly_id.js'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    FileRecord.createMany([
      {
        storageIdentifier: getFriendlyId(),
        contentType: 'application/pdf',
        filename: 'transmetropolitan.pdf',
        userId: 1,
      },
      {
        storageIdentifier: getFriendlyId(),
        contentType: 'application/pdf',
        filename: 'batman.pdf',
        userId: 1,
      },
      {
        storageIdentifier: getFriendlyId(),
        contentType: 'application/pdf',
        filename: 'spiderman.pdf',
        userId: 1,
      },
    ])
  }
}
