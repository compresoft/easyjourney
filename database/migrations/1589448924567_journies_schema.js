'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JourniesSchema extends Schema {
  up () {
    this.create('journies', (table) => {
      table.increments()
      table.integer('agency_id').unsigned().references('id').inTable('agencies')
      table.bigInteger('destination_id').notNullable()
      table.time('time_to_travel').notNullable()
      table.timestamps()
    })
  }
  down () {
    this.drop('journies')
  }
}
module.exports = JourniesSchema
