'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Agency extends Model {
  agency_towns() {
     return  this.belongsToMany('App/Models/Maintown')
     .pivotTable("branches")
   }
}
module.exports = Agency
