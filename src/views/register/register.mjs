import {listen, Micro} from "../../lib/lib.js";

listen("#registerForm", "submit", function(event)
{
	event.preventDefault();
	
	const username = this.querySelector(`input[name="username"]`)?.value;
	const email = this.querySelector(`input[name="email"]`)?.value;
	const password = this.querySelector(`input[name="password"]`)?.value;
	
	Micro.call({action: "register", username, email, password});
});