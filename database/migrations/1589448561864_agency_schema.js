'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
class AgencySchema extends Schema {
  up () {
    this.create('agencies', (table) => {
      table.increments()
      table.string('agency_name',200).notNullable().unique()
      table.string('agency_base',200).notNullable()
      table.integer('contact',200).notNullable().unique()
      table.string('email',356).nullable()
      table.string('logo').nullable()
      table.timestamps()
    })
  }
  down () {
    this.drop('agencies')
  }
}
module.exports = AgencySchema
