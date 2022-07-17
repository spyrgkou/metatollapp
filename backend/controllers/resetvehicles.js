const mongoose = require('mongoose');
const Vehicle = require('../models/vehicles');
const dbconfig = require('../config/dbconfig');
const csvtojson = require('csvtojson');

module.exports = async (req, res) => {
    mongoose.connect(dbconfig);
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
        res.status(500).json({"Status":"Something went wrong!"});
	}
};