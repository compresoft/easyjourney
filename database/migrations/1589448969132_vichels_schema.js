'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VichelsSchema extends Schema {
  up () {
    this.create('vichels', (table) => {
      table.integer('agency_id').unsigned().references('id').inTable('agencies')
      table.string('plate_number',30).notNullable()
      table.integer('seats',30).notNullable()
      table.string('type',30).notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('vichels')
  }
}

module.exports = VichelsSchema
