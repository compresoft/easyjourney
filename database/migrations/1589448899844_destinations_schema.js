'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DestinationsSchema extends Schema {
  up () {
    this.create('destinations', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('subbranch_id').unsigned().references('id').inTable('subbranches')
      table.integer('maintown_id').unsigned().references('id').inTable('Maintowns')
      table.integer('agency_id').unsigned().references('id').inTable('agencies')
      table.string('town',30).notNullable()
      table.string('type',30).notNullable()
      table.integer('amount').notNullable()
      table.bigInteger('d2').notNullable()
      table.bigInteger('town_from').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('destinations')
  }
}

module.exports = DestinationsSchema
