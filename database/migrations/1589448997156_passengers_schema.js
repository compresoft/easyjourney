'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PassengersSchema extends Schema {
  up () {
    this.create('passengers', (table) => {
      table.increments()
      table.bigInteger('user_id').notNullable()
      table.string('first_name', 254).notNullable()
      table.string('last_name', 254).notNullable()
      table.string('address', 254).notNullable()
      table.bigInteger('contact', 254).notNullable()
      table.string('id_card_no', 254).notNullable()
      table.timestamps()
    })
  }
  down () {
    this.drop('passengers')
  }
}

module.exports = PassengersSchema
