const Station = require('../models/stations');
const csvtojson = require('csvtojson');
const ExpressError = require('../errorHandler')

module.exports = async (req, res, next) => {
	try {
        await Station.deleteMany();
        var arrayToInsert = [];
        var stationFilename =__dirname+'/../static/sampledata01_stations.csv';
        await csvtojson().fromFile(stationFilename).then(csvdata=>{
            for (var i=0; i<csvdata.length; i++){
                var oneRow = {
                    stationId: csvdata[i]["stationID"],
                    stationProvider: csvdata[i]["stationProvider"],
                    stationName: csvdata[i]["stationName"]
                };
                arrayToInsert.push(oneRow);
            }
        });
        Station.insertMany(arrayToInsert, (err, result)=>{
            if (err) res.status(500).json({"Status":"Failed!"});
            if (result) {
                res.status(200).json({"Status":"OK"});
            }
        });
	} catch (error) {
        next(new ExpressError(error.message, 500));
	}
};