delete require.cache[module.filename];

const sqlite3 = require("sqlite");
const {open} = require("sqlite");
const sleepless = require("sleepless");
const fs = require("fs");
const path = require("path");
const L = sleepless.log5.mkLog("--- ManageGames\t\t")(3);

const DS = require("ds").DS;
const ds = new DS(__dirname + "/.api.config.json");

const TEMPLATE_VERSION = "0.0.1";
const gamesFolder = __dirname + "/games/";

module.exports = {
	async connect(input, okay, fail)
	{
		L.V("Calling connect");
		okay("success");
	},
	getAllGames(input, okay, fail)
	{
		let hasGamesFolder = fs.existsSync(gamesFolder);
		
		if(!hasGamesFolder)
		{
			try
			{
				fs.mkdirSync(gamesFolder);
			}
			catch(e)
			{
				fail("failed to create gamesFolder", {error: e});
				return false;
			}
		}
		
		try
		{
			let gamesList = fs.readdirSync(gamesFolder);
			
			let games = [];
			gamesList.forEach(game =>
			{
				const gameDS = new DS(gamesFolder + game);
				if(gameDS)
				{
					// we only want a smaller subset of these
					games.push({name: gameDS.name, version: gameDS.version});
				}
			});
			L.D(games);
			okay("success", {games});
			return true;
		}
		catch(e)
		{
			fail("Failed to read gamesFolder", {error: e});
			return false;
		}
	},
	createNewGame(input, okay, fail)
	{
		// create a NEW ds for each game!
		let {gameName} = input;
		if(!gameName)
		{
			fail("Must provide the name of the game!");
			return false;
		}
		
		gameName = gameName.toId();
		
		const gameDS = new DS(gamesFolder + gameName + ".json");
		gameDS.version = TEMPLATE_VERSION;
		gameDS.name = gameName;
		
		gameDS.save();
		okay("success", {game: gameDS});
	},
	deleteGame(input, okay, fail)
	{
		let {gameName} = input;
		if(!gameName)
		{
			fail("Must provide the name of the game!");
			return false;
		}

		gameName = gameName.toId();
		try
		{
			if(fs.existsSync(gamesFolder + gameName + ".json"))
			{
				fs.rmSync(gamesFolder + gameName + ".json", {force: true});
			}
		}
		catch(e)
		{
			fail("Failed to deleted game", {error: e});
			return false;
		}
		
		okay("success");
		return true;
	}
}