'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BranchesSchema extends Schema {
  up () {
    this.create('branches', (table) => {
      table.increments()
      table.integer('maintown_id').unsigned().references('id').inTable('maintowns').onDelete('cascade')
      table.integer('agency_id').unsigned().references('id').inTable('agencies').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('branches')
  }
}

module.exports = BranchesSchema
