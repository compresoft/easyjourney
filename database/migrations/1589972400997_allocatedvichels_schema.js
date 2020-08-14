'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
class AllocatedvichelsSchema extends Schema {
  up () {
    this.create('allocatedvichels', (table) => {
      table.increments()
      table.integer('journey_id').unsigned().references('id').inTable('journies')
      table.integer('vichel_id').unsigned().references('id').inTable('vichels')
      table.date('date_to_travel',30).notNullable()
      table.bigInteger('subbranch_from').notNullable()
      table.integer('subbranch_id').unsigned().references('id').inTable('subbranches')
      table.time('time_to_travel').notNullable()
      table.string('type',30).notNullable()
      table.timestamps()
    })
  }
  down () {
    this.drop('allocatedvichels')
  }
}
module.exports = AllocatedvichelsSchema
