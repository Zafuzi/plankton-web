delete require.cache[module.filename];

const sleepless = require("sleepless");
const mysql = require("mysql8");
const L = sleepless.log5.mkLog("--- Auth\t\t")(5);

const db = require("./dbpool");

module.exports = {
	login(input, okay, fail)
	{
		let {username, password} = input;
		if(!username)
		{
			fail("Please provide a username");
			return false;
		}

		if(!password)
		{
			fail("Please provide a password");
			return false;
		}

		db.get_one("SELECT 1 + 1 as solution", function(result)
		{
			okay("success", {...result});
		}, fail);
	},
	register(input, okay, fail)
	{
		let {username, email, password} = input;
		if(!username)
		{
			fail("Please provide a username");
			return false;
		}

		if(!email)
		{
			fail("Please provide an email");
			return false;
		}

		if(!password)
		{
			fail("Please provide a password");
			return false;
		}


		okay("success");
	}
}