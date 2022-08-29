import {listen, Micro} from "../../lib/lib.js";

listen("#loginForm", "submit", function(event)
{
	event.preventDefault();
	
	const username = this.querySelector(`input[name="username"]`)?.value;
	const password = this.querySelector(`input[name="password"]`)?.value;
	
	Micro.call({action: "login", username, password});
});