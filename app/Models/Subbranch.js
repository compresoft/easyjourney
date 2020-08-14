'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Subbranch extends Model {
	subbrances() {
     return  this.belongsToMany('App/Models/Subbranch')
     .pivotTable("branches")
   }
}

module.exports = Subbranch
