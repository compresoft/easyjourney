'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketsSchema extends Schema {
  up () {
    this.create('tickets', (table) => {
      table.increments()
      table.integer('vichel_allocation_id').unsigned().references('id').inTable('vichels').onDelete('cascade')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('seat',30).notNullable()
      table.time('time_reserved').notNullable()
      table.date('date_reserved').notNullable()
      table.timestamps()
    })
  }
  down () {
    this.drop('tickets')
  }
}

module.exports = TicketsSchema
