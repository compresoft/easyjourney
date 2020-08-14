'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonSchema extends Schema {
  up () {
    this.create('people', (table) => {
      table.bigInteger('user_id').notNullable()
      table.string('first_name', 254).notNullable()
      table.string('last_name', 254).notNullable()
      table.string('address', 254).notNullable()
      table.bigInteger('contact', 254).notNullable()
      table.string('id_card_no', 254).nullable()
      table.increments()
      table.timestamps()
    })
  }
  down () {
    this.drop('people')
  }
}

module.exports = PersonSchema
