delete require.cache[module.filename];

const sleepless = require("sleepless");
const fs = require("fs");
const path = require("path");
const L = sleepless.log5.mkLog("--- Editor\t\t")(3);

const DS = require("ds").DS;
const ds = new DS(__dirname + "/.api.config.json");

const gamesFolder = __dirname + "/games/";

module.exports = {
	getGame(input, okay, fail)
	{
		const {gameName} = input;
		if(!gameName)
		{
			fail("Must provide the name of the game to load...");
			return false;
		}
		
		const gameDS = new DS(gamesFolder + gameName + ".json");
		if(gameDS?.name !== gameName)
		{
			fail("Name does not matched stored name...");
			return false;
		}
		
		okay("success", {game: gameDS});
		return true;
	}
}
