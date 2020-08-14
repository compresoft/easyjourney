'use strict'
const Route = use('Route')
Route.group(() => {
	Route.post('login','UserController.login');
	Route.get('getmaintowns','MaintownController.getmaintowns');
	Route.get('gettownagencies','MaintownController.gettownagencies');
	Route.get('agencyMainTowns','AgencyController.agencyMainTowns');
	Route.get('destinations','AgencyController.destinations');
	Route.get('getSbranches','AgencyController.getSbranches');
	Route.post('program_journies','AllocatedvichelController.program_journies');
	Route.post('register_subbranch','AgencyController.register_subbranch');
	Route.post('buy_ticket','TicketController.buy_ticket');
	Route.get('choose_seat','TicketController.choose_seat');
	Route.post('register_vichel','AgencyController.register_vichel');
	Route.post('register_price','AgencyController.register_price');
	Route.get('cancelpayment','TicketController.cancelpayment');
	Route.get('paymentnotification','TicketController.paymentnotification');
	Route.get('savepayment','TicketController.savepayment');
	Route.post('register_agency','AgencyController.register_agency');
	Route.post('signup','UserController.signup')
}).prefix('api')

Route.group(() => {
	Route.get('user','UserController.user');
	Route.post('agency','AgencyController.store');
	Route.patch('agency/:id','AgencyController.update');
	Route.delete('agency/:id','AgencyController.destroy');
}).middleware(['auth:api']).prefix('api')

