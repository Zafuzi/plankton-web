/*
	We destructure the module.exports of each module we want to include as an API
	so the final structure looks like
	
	module.exports = {
	ping: function()...
	foo: function()...
	bar: function()...
}
	*/
module.exports = {
	...require("./rpc_manageGames"),
	...require("./rpc_editor"),
}
