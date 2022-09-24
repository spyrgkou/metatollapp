const Pass = require('../models/passes');
const Station = require('../models/stations');
const Vehicle = require('../models/vehicles');
const ISODateFromString = require('../helpers');

module.exports = async (req, res) => {
	try {
        var queryResults = await Pass.find({stationRef: req.params.stationID,
            timeStamp: {$gte: ISODateFromString(req.params.date_from), $lt: ISODateFromString(req.params.date_to)}});
        
        if (Object.keys(queryResults).length === 0){
            res.status(204).send("NO CONTENT");
        } else {
            res.status(200).json({
                Station: req.params.stationID,
                StationOperator: (await Station.findOne({stationId: req.params.stationID})).stationProvider,
                RequestTimestamp: new Date().toISOString(),
                PeriodFrom: ISODateFromString(req.params.date_from),
                PeriodTo: ISODateFromString(req.params.date_to),
                NumberOfPasses: queryResults.length,
                PassesList: await Promise.all(queryResults.map(async (passElement, passInd) => ({
                    PassIndex: passInd+1,
                    PassTimeStamp: passElement.timeStamp,
                    VehicleID: passElement.vehicleRef,
                    TagProvider: (await Vehicle.findOne({VehicleID: passElement.vehicleRef})).tagProvider,
                    PassType: (await Vehicle.findOne({VehicleID: passElement.vehicleRef})).tagProvider 
                                == (await Station.findOne({stationId: req.params.stationID})).stationProvider
                                ? "home" : "visitor",
                    PassCharge: passElement.charge
                })))
            });
        }
	} catch (error) {
        res.status(500).json({"Status":"Something went wrong!"});
	}
};