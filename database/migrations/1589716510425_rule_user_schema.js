'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RuleUserSchema extends Schema {
  up () {
    this.create('rule_user', (table) => {
      table.increments()
      table.integer('rule_id').unsigned().references('id').inTable('rules')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('agency_id').unsigned().references('id').inTable('agencies')
      table.integer('subbranch_id').unsigned().references('id').inTable('subbranches')
      table.timestamps()
    })
  }
  down () {
    this.drop('rule_user')
  }
}

module.exports = RuleUserSchema
