'use strict'
const User=use('App/Models/User');
const person=use('App/Models/Person');
class UserController {


	async login({request,response,auth}){
		const {email,password}=request.only(['email' ,'password']);
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            await user.loadMany(['rules','person'])
            let token = await auth.generate(user)
            return response.json({"user":user, "token": token})
          } 
	}
	async signup({request,response}){
		const {username, email,password}=request.only(['username', 'email', 'password']);
		const new_user=await User.create({
			username,
			email,
			password
		})
		let person_data = new person()
		person_data.first_name = request.input('first_name');
		person_data.last_name = request.input('last_name');
		person_data.user_id = new_user.id;
		person_data.address = request.input('address');
		person_data.contact = request.input('contact');
		person_data.id_card_no = request.input('id_card_no');
		await person_data.save();
		return response.send({message:'User is created'})
	}
	async show({params,response}){
		const user=await User.find(params.id)
		const res={username:user.username,
				   email:user.email
		}
		return response.json(res)
	}
}
module.exports = UserController
