import {rplc8, Micro, listen} from "../../lib/lib.js";

let r8_game = rplc8("#r8_game");

export const redrawGamesList = function()
{
	Micro.call({action: "getAllGames"}, function(response)
	{
		console.log(response);
		
		r8_game.update(response.data?.games || [], function(instance, data)
		{
			// delete game listener
			listen(instance.querySelector(".deleteGame"), "click", function(event)
			{
				Micro.call({action: "deleteGame", gameName: data.name}, redrawGamesList);
			});
		});
	}, console.error);
}

// create game listener
listen("#createNewGame", "submit", function(event)
{
	event.preventDefault();
	let gameName = document.getElementById("newGameName")?.value;
	if(!gameName)
	{
		throw "You must provide a name for your new game.";
	}
	
	Micro.call({action: "createNewGame", gameName}, function(response)
	{
		redrawGamesList();
	});
	
	this.reset();
});

redrawGamesList();