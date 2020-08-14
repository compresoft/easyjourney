'use strict'
const User=use('App/Models/User');
const Agency=use('App/Models/Agency');
const Branch=use('App/Models/Branch');
const Subbranch=use('App/Models/Subbranch');
const Database = use('Database')
const Maintowns=use('App/Models/Maintown')
const Destinations=use('App/Models/Destination')

const Vichels=use('App/Models/Vichel')
const Tickets=use('App/Models/Ticket')

const Requests = require('Request'); // Adonis request method
const axios = require('axios');

const Allocatedvichels=use('App/Models/Allocatedvichel')
let  freeseats = [];
class TicketController {
	async choose_seat({request,params, response,auth}){
		const subbranch_from=request.input('subbranch_from')
		const subbranch_to=request.input('subbranch_to')
		const journey_type=request.input('journey_type')
		const date_to_travel=request.input('travelling_date')
		const time_to_travel=request.input('travelling_time')
		const allocated_vichels=await Database.select('vichel_id').
									   from('Allocatedvichels')
						              .where({'subbranch_id':subbranch_to,
						               'type':journey_type, 
						               'date_to_travel':date_to_travel, 
						               'time_to_travel':time_to_travel,
						                'subbranch_from':subbranch_from})
		for(let i=0; i<allocated_vichels.length; i++) {
			var  potential_vichel= await Vichels.find(allocated_vichels[i].vichel_id)
			var no_places=potential_vichel.seats+1
			var no_reserved_seats=await Database.from('Tickets')
									    .where('vichel_allocation_id',potential_vichel.id)
									    .where('time_reserved',time_to_travel)
									    .where('date_reserved',date_to_travel)
			
			for (let k=0; k<freeseats.length; k++){
				    freeseats.splice(k)

			    }
		   	if (no_reserved_seats.length<no_places){
				for(let j=1; j<no_places; j++) {
					let seat_reserved=await Database.from('Tickets')
													.where('vichel_allocation_id',potential_vichel.id)
													.where('time_reserved',time_to_travel)
													.where('date_reserved',date_to_travel)
													.where('seat',j)
				   	if (seat_reserved.length == 0 ){
				   		freeseats.push(j)
				   	}   
				}
				return response.json({"freeseats":freeseats,'vichel':potential_vichel})
		   	}



		}
		return 0
	}

	async paymentnotification({request,response,auth}){
		return json.send({message:'you paid'})	
	}

	async savepayment({request,response,auth}){
		
		let phone="697038610"
		const email="sergefonguen@gmail.com"
		const nom="serge"
		const rh="AR171A730020"
		const montant="2000"
		const devise="XAF"
		const mode="X,Y,Z"
		const langue="en"
		const success="http://localhost:4200/savepayment"
		const cancel="http://localhost:4200/cancelpayment"
		const notify="http://localhost:4200/paymentnotification"
		const motif="seat payment"
		
		// return response.redirect("https://my-dohone.com/dohone/pay/?cmd=start&rN="
		// 	+nom
		// 	+"&rT="+phone
		// 	+"&rH ="+rh
		// 	+"&rI= 1"
		// 	+"&rMt="+montant
		// 	+"&rDvs="+devise
		// 	+"&rOnly=X,Y,Z"
		// 	+"&rLocal=en"
		// 	+"&source=smat funder"
		// 	+"&enPage="+success
		// 	+"&cancelPage="+cancel
		// 	+"&notifyPage="+notify
		// 	+"&motif="+motif
		// 	+"&logo="
		// );

		const url = "https://my-dohone.com/dohone/pay/?cmd=start&rN="
			+nom
			+"&rT="+phone
			+"&rH ="+rh
			+"&rI= 1"
			+"&rMt="+montant
			+"&rDvs="+devise
			+"&rOnly=X,Y,Z"
			+"&rLocal=en"
			+"&source=smat funder"
			+"&enPage="+success
			+"&cancelPage="+cancel
			+"&notifyPage="+notify
			+"&motif="+motif
			+"&logo="

		let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Credentials": true,
            }
        };

		axios.get(url, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Credentials": true,
            }
        }).then((result) => {
            return response.send(view, JSON.parse(result));
        });
	}
	
	async cancelpayment({request,response,auth}){
		return json.send({message:'you cancel'})	
	}
}

module.exports = TicketController
