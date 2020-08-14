'use strict'
const User=use('App/Models/User');
const Agency=use('App/Models/Agency');
const Branch=use('App/Models/Branch');
const Subbranch=use('App/Models/Subbranch');
const Database = use('Database')
const Maintowns=use('App/Models/Maintown')
const Destinations=use('App/Models/Destination')  
const Vichels=use('App/Models/Vichel')
const Allocatedvichels=use('App/Models/Allocatedvichel')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with allocatedvichels
 */
class AllocatedvichelController {
  /**
   * Show a list of all allocatedvichels.
   * GET allocatedvichels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new allocatedvichel.
   * GET allocatedvichels/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 
  async program_journies({request,response,auth}){
    const destinations=(request.input('destinations'))

    const vichels=(request.input('vichels'))
    const kick_off_time=(request.input('kick_off_time'))
    const date_to_travel=(request.input('date_to_travel'))
    const journey_type=(request.input('journey_type'))
    const user=await auth.getUser()
    const sql=await Database.select('subbranch_id').from('rule_user').where('user_id',user.id).last()
    const subbranch_from=await  Subbranch.find(sql.subbranch_id)
   
    for(let i=0; i<destinations.length; i++) {
      let subbranch= await Subbranch.find(destinations[i])
      for(let i=0; i<vichels.length; i++) {
        let vichel= await Vichels.find(vichels[i])
        const vichel_is_free=await Database.from('allocatedvichels').where('date_to_travel',date_to_travel).where('vichel_id',vichel.id).where('time_to_travel',kick_off_time).where('subbranch_id',subbranch.id)
           if (vichel_is_free.length<1){
             let journey_data = new Allocatedvichels()
              journey_data.vichel_id = vichel.id;
              journey_data.type = journey_type;
              journey_data.subbranch_from =subbranch_from.id;
              journey_data.subbranch_id = subbranch.id;
              journey_data.date_to_travel = date_to_travel;
              journey_data.time_to_travel = kick_off_time;
              await journey_data.save();
           }  
      } 
    }
    return response.send({message:'Journey Programmed'})    
  }

  /**
   * Create/save a new allocatedvichel.
   * POST allocatedvichels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single allocatedvichel.
   * GET allocatedvichels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing allocatedvichel.
   * GET allocatedvichels/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update allocatedvichel details.
   * PUT or PATCH allocatedvichels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a allocatedvichel with id.
   * DELETE allocatedvichels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AllocatedvichelController
