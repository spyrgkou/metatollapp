const Pass = require('../models/passes');
const User = require('../models/users');
const csvtojson = require('csvtojson');
const inputCSVDateCorrection = require('../helpers').inputCSVDateCorrection;
const ExpressError = require('../errorHandler')

module.exports = async (req, res, next) => {
	try {
        await User.deleteMany();
        await User.create({
            username:"admin", 
            password:"freepasses4all", 
            role: "admin", 
            name: "admin", 
            abbrevation:"ADMIN",
            email: "adsfs@sadfa.com"
        });

        await Pass.deleteMany();
        
        var arrayToInsert = [];
        var passFilename =__dirname+'/../static/sampledata01_passes100_8000.csv';
        await csvtojson().fromFile(passFilename).then(csvdata => {
            for (var i=0; i<csvdata.length; i++){
                var oneRow = {
                    passId: csvdata[i]["passID"],
                    timeStamp: inputCSVDateCorrection(csvdata[i]["timestamp"]),
                    stationRef: csvdata[i]["stationRef"],
                    vehicleRef: csvdata[i]["vehicleRef"],
                    charge: csvdata[i]["charge"]
                };
                arrayToInsert.push(oneRow);
            }
        });

        Pass.insertMany(arrayToInsert, (err, result)=>{
            if (err) res.status(500).json({"Status":err.message});
            if (result) {
                res.status(200).json({"Status":"OK"});
            }
        });

    } catch (error) {
        next(new ExpressError(error.message, 500));
	}
};