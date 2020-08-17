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
class UserController {
	async register_agency({request,response,auth}){
		const user=await auth.getUser()
		const  {agency_name, agency_base, contact, email,logo}=request.only(['agency_name', 'agency_base', 'contact', 'email',request.file('logo', {types: ['image'],size: '2mb' })]);
		const new_agency=await Agency.create({
			agency_name,
			agency_base,
			contact,
			email,
			logo
		})
		const towns_chosen=(request.input('town_chosen'))
		for(let i=0; i<towns_chosen.length; i++) {
			let branch= await Maintowns.find(towns_chosen[i])
		    let branch_data = new Branch()
			branch_data.agency_id = new_agency.id;
			branch_data.maintown_id =branch.id;
			await branch_data.save();
		}		
	}


	async agencyMainTowns({request,response,auth}){
		const user=await auth.getUser()
		const sql=await Database.select('agency_id').from('rule_user').where('user_id',user.id).last()
		const gotten_agency=await Agency.find(sql.agency_id)
		await gotten_agency.loadMany(['agency_towns'])
		return response.json({'gotten_agency':gotten_agency})
	}


	async destinations({request, params, response,auth}){
		const user=await auth.getUser()
		const sql=await Database.select('subbranch_id').from('rule_user').where('user_id',user.id).last()
		if (request.get(params).journey_type == 'undefined' ||request.get(params).journey_type == ''  ){
			const destinations=await Database.from('Destinations').where('subbranch_id',sql.subbranch_id)
			const sql_agency=await Database.select('agency_id').from('rule_user').where('user_id',user.id).last()
			const gotten_agency=await Agency.find(sql_agency.agency_id)
			const vichels=await Database.from('Vichels').where('agency_id',gotten_agency.id)
			return response.json({'destinations':destinations,'vichels':vichels})
		} else {


			if (request.get(params).subbranch_from == 'undefined' ||request.get(params).subbranch_from == ''  ){
				const destinations=await Database.from('Destinations').where('subbranch_id',sql.subbranch_id).where('type',request.get(params).journey_type)
				const sql_agency=await Database.select('agency_id').from('rule_user').where('user_id',user.id).last()
				const gotten_agency=await Agency.find(sql_agency.agency_id)
				const vichels=await Database.from('Vichels').where('agency_id',gotten_agency.id).where('type',request.get(params).journey_type)
				return response.json({'destinations':destinations,'vichels':vichels})
			}

			else{
				const comming_from=await Subbranch.find(request.get(params).subbranch_from)
				const destinations=await Database.from('Destinations').where('subbranch_id',comming_from.id).where('type',request.get(params).journey_type)
				const sql_agency=await Database.select('agency_id').from('rule_user').where('user_id',user.id).last()
				const gotten_agency=await Agency.find(sql_agency.agency_id)
				const vichels=await Database.from('Vichels').where('agency_id',gotten_agency.id).where('type',request.get(params).journey_type)
				return response.json({'destinations':destinations,'vichels':vichels})
			}
			
		}
	}
	async getSbranches({auth,request,params,response}){
		const id = params
		const user=await auth.getUser()
		const sql=await Database.select('agency_id').from('rule_user').where('user_id',user.id).last()
		const gotten_agency=await Agency.find(sql.agency_id)
		
		await gotten_agency.loadMany(['agency_towns'])
		const maintown=await Maintowns.find(request.get(params).maintown_id)
		if (request.get(params).agency_id == 'undefined'){
			let subbranches = await Database.from('subbranches').where('maintown_id',maintown.id).where('agency_id',gotten_agency.id)
			const towns_to=await gotten_agency.agency_towns().fetch()
			return response.json({'getsubranches':subbranches,'gotten_agency':gotten_agency})
		} else {
			const chosen_agency=await Agency.find(request.get(params).agency_id)
			let subbranches=await Database.from('subbranches').where('maintown_id',maintown.id).where('agency_id',chosen_agency.id)
			return response.json({'getsubranches':subbranches})
		}
		
		
	}
	async register_subbranch({request,response,auth}){
		const user=await auth.getUser()
		const sql=await Database.select('agency_id').from('rule_user').where('user_id',user.id).last()
		const maintown=await Maintowns.find(request.input('branch'))
		const subbranch_name=request.input('subbranch_name')
		const location=request.input('location')
		const gotten_agency=await Agency.find(sql.agency_id)
		const subbranch_exist=await Database.from('subbranches').where('subbranch_name',subbranch_name).where('maintown_id',maintown.id).where('agency_id',gotten_agency.id)
		if (subbranch_exist.length<1){
			let subbranch_data = new Subbranch()
			subbranch_data.subbranch_name=subbranch_name
			subbranch_data.maintown_id=maintown.id
			subbranch_data.agency_id=gotten_agency.id
			subbranch_data.location=location
			await subbranch_data.save()
			return response.send({message:'Branch is created'})
		}
		
	}


	async register_vichel({request,response,auth}){
		const user=await auth.getUser()
		const sql=await Database.select('agency_id').from('rule_user').where('user_id',user.id).last()
		const plate_number=request.input('plate_number')
		const number_seats=request.input('number_seats')
		const type=request.input('type')
		const gotten_agency=await Agency.find(sql.agency_id)
		const vichel_exist=await Database.from('vichels').where('plate_number',plate_number).where('agency_id',gotten_agency.id)
		if (vichel_exist.length<1){
			let vichel_data = new Vichels()
			vichel_data.seats=number_seats
			vichel_data.plate_number=plate_number
			vichel_data.agency_id=gotten_agency.id
			vichel_data.type=type
			await vichel_data.save()
			return response.send({message:'Vichel Registered'})
		}
	}

	async register_price({request,response,auth}){
		const user=await auth.getUser()
		
		const subbranch_from=await Subbranch.find(request.input('subbranch_from'))
		const subbranch_to=await Subbranch.find(request.input('subbranch_to'))
		const journey_type=request.input('journey_type')
		const amount=request.input('amount')
		
		const price_exist_from=await Database.from('destinations').where('subbranch_id',subbranch_from.id).where('d2',subbranch_to.id).where('type',journey_type)
		const price_exist_to=await Database.from('destinations').where('subbranch_id',subbranch_to.id).where('d2',subbranch_from.id).where('type',journey_type)
		if (price_exist_from.length<1 && price_exist_to.length<1){
			let price_data = new Destinations()
			price_data.subbranch_id=subbranch_from.id
			price_data.d2=subbranch_to.id
			price_data.amount=amount
			price_data.town_from=1
			price_data.town=subbranch_to.location
			price_data.type=journey_type
			await price_data.save()
			
		}
		return response.send({message:'Price is Registered'})
	}

	
}
module.exports = UserController
