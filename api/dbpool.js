// this module does not flush
// but your module does
const mysql = require("mysql8");

const config = require("./.auth.config.js");
if(!config?.host || !config?.user || !config?.password || !config?.database || !config?.port)
{
	throw "Auth config is incorrect";
}

const cache = {};

const getConnection = function()
{
	let key = config.user + config.password + config.host + config.database + config.port;

	let conn = cache[key];
	if(conn)
	{
		return conn;
	}

	conn = mysql.createPool(config);

	if(!conn)
	{
		throw "Creating connection pool failed";
	}

	cache[key] = conn;

	return conn;
};

module.exports = {
	getConnection,

	query(sql, args, okay, fail)
	{
		return getConnection().query(sql, args, (err, res) =>
		{
			if(err)
			{
				if(fail)
				{
					fail(err);
				}
				else
				{
					throw err;
				}
			}
			else
			{
				if(okay)
				{
					okay(res);
				}
			}
		});
	},

	get_recs(sql, args, okay, fail)
	{
		return getConnection().query(sql, args, (rows) =>
		{
			okay(rows);
		}, fail);
	},

	get_one(sql, args, okay, fail)
	{
		return getConnection().get_recs(sql, args, (rows) =>
		{
			okay(rows[0]);
		}, fail);
	},

	update(sql, args, okay, fail)
	{
		return getConnection().query(sql, args, res =>
		{
			okay(res.affectedRows);
		}, fail);
	},

	insert(sql, args, okay, fail)
	{
		return getConnection().query(sql, args, res =>
		{
			okay(res.insertId);
		}, fail);
	},

	delete(sql, args, okay, fail)
	{
		return getConnection().query(sql, args, res =>
		{
			okay(res.affectedRows);
		}, fail);
	}
};