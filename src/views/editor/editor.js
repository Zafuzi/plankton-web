import {getQueryData, Micro, rplc8} from "../../lib/lib.js";

let r8_gameData = rplc8("#r8_gameData");

const searchParams = getQueryData();
console.log(searchParams);

Micro.call({action: "getGame", gameName: searchParams.gameName}, function(response)
{
	console.log(response);
	r8_gameData.update([response.data?.game] || [{}]);
});