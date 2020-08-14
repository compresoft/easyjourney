'use strict'
const User=use('App/Models/User');
const Maintowns=use('App/Models/Maintown') 
class MaintownController {
	async getmaintowns({request,response}){
		const maintowns=  await Maintowns.all();
		return response.json({'maintowns':maintowns})
	}

	async gettownagencies({request,response,params}){
		const maintown=await Maintowns.find(request.get(params).maintown_id)
		await maintown.loadMany(['agencies'])
		return response.json({'maintown':maintown})
	}
}

module.exports = MaintownController
