'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BranchesSchema extends Schema {
  up () {
    this.create('branches', (table) => {
      table.increments()
      table.foreign('maintown_id').references('maintowns.id').onDelete('cascade')
      table.foreign('maintown_id').references('agencies.id').onDelete('cascade')
      
      
      table.timestamps()
    })
  }

  down () {
    this.drop('branches')
  }
}

module.exports = BranchesSchema
