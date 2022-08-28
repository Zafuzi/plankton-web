delete require.cache[module.filename];

const sqlite3 = require("sqlite");
const {open} = require("sqlite");
const sleepless = require("sleepless");
const L = sleepless.log5.mkLog("--- ManageGames\t\t")(5);

const DS = require("ds").DS;
const ds = new DS(__dirname + "/api.json");

const TEMPLATE_VERSION = "0.0.1";

module.exports = {
	async connect(input, okay, fail)
	{
		L.V("Calling connect");
		okay("success");
	},
	getAllGames(input, okay, fail)
	{
		const games = ds.games;
		if(!games)
		{
			ds.games = {};
			ds.save();
		}
		
		okay("success", {games: ds.games});
	},
	createNewGame(input, okay, fail)
	{
		let {gameName} = input;
		let games = ds.games;
			games[gameName] = {name: gameName, version: TEMPLATE_VERSION};
		
		ds.save();
		okay("success");
	}
}