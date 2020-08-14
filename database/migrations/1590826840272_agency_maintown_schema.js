'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgencyMaintownSchema extends Schema {
  up () {
    this.create('agency_maintown', (table) => {
      table.increments()
      table.timestamps()
      table
      	.integer('agency_id')
      	.unsigned()
      	.index('agency_id')
      table
      	.integer('town_id')
      	.unsigned()
      	.index('town_id')
      table
      	.foreign('agency_id')
      	.references('agencies.id')
      	.onDelete('cascade')
      table
      	.foreign('town_id')
      	.references('maintowns.id')
      	.onDelete('cascade')
    })
  }

  down () {
    this.drop('agency_maintown')
  }
}

module.exports = AgencyMaintownSchema
