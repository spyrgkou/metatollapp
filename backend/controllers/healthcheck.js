const mongoose = require('mongoose');
const dbconfig = require('../config/dbconfig');
require('../app');

module.exports = async (req, res) => {
	if (mongoose.connection.readyState === 1){
		res.status(200).json({"Status":"DB is working"});
	} else {
		res.status(200).json({"Status":"Disconnected"});
	}
};

// db.createUser({
//     user: "appAdmin",
//     pwd: "appAdmin123",
//     roles : ["readWrite", "dbAdmin"]
// });

// mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]