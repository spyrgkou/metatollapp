const Vehicle = require('../models/vehicles');
const csvtojson = require('csvtojson');
const ExpressError = require('../errorHandler')

module.exports = async (req, res, next) => {
	try {
        await Vehicle.deleteMany();
        var arrayToInsert = [];
        var vehicleFilename =__dirname+'/../static/sampledata01_vehicles_100.csv';
        await csvtojson().fromFile(vehicleFilename).then(csvdata=>{
            for (var i=0; i<csvdata.length; i++){
                var oneRow = {
                    vehicleId: csvdata[i]["vehicleID"],
                    tagId: csvdata[i]["tagID"],
                    tagProvider: csvdata[i]["tagProvider"],
                    providerAbbr: csvdata[i]["providerAbbr"],
                    licenseYear: csvdata[i]["licenseYear"]
                };
                arrayToInsert.push(oneRow);
            }
            Vehicle.insertMany(arrayToInsert, (err, result)=>{
                if (err) res.status(500).json({"Status":"Failed!"});
                if (result) {
                    res.status(200).json({"Status":"OK"});
                }
            });
        });
	} catch (error) {
        next(new ExpressError(error.message, 500));
	}
};