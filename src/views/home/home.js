import {rplc8, Micro, listen} from "../../lib/lib.js";

let r8_game = rplc8("#r8_game");

export const redrawGamesList = function()
{
	Micro.call({action: "getAllGames"}, function(response)
	{
		console.log(response);
		let results = [];
		Object.keys(response.data?.games).forEach(game =>
		{
			results.push(response.data.games[game]);
		});
		console.log(results);
		r8_game.update(results);
	}, console.error);
}

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