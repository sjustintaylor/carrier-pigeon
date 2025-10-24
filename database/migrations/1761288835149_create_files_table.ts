import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'files'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('storage_identifier')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.index(['user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
