const mongoose = require('mongoose');
const dbconfig = require('../config/dbconfig');
require('../server');
const ExpressError = require('../errorHandler')

module.exports = async (req, res, next) => {
	try {
		if (mongoose.connection.readyState === 1){
			res.status(200).json({"Status":"DB is working"});
		} else {
			res.status(200).json({"Status":"Disconnected"});
		}
	} catch (error) {
        // res.status(500).json({"Status":"Something went wrong!"});
        next(new ExpressError(error.message, 500));
	}
};

// db.createUser({
//     user: "appAdmin",
//     pwd: "appAdmin123",
//     roles : ["readWrite", "dbAdmin"]
// });

// mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]