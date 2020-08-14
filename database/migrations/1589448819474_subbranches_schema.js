'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubbranchesSchema extends Schema {
  up () {
    this.create('subbranches', (table) => {
      table.increments()
      table.integer('maintown_id').unsigned().references('id').inTable('maintowns').onDelete('cascade')
      table.integer('agency_id').unsigned().references('id').inTable('agencies').onDelete('cascade')
      table.string('subbranch_name',200).notNullable()
      table.string('location',200).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('subbranches')
  }
}

module.exports = SubbranchesSchema
