'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WorkersSchema extends Schema {
  up () {
    this.create('workers', (table) => {
      table.increments()
      table.bigInteger('user_id').notNullable()
      table.bigInteger('subbranch_id').notNullable()
      table.string('worker_name',200).notNullable().unique()
      table.string('address',200).notNullable()
      table.integer('contact',200).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('workers')
  }
}

module.exports = WorkersSchema
