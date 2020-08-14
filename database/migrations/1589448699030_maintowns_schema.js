'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MaintownsSchema extends Schema {
  up () {
    this.create('maintowns', (table) => {
      table.increments()
      table.string('town_name',30).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('maintowns')
  }
}

module.exports = MaintownsSchema
