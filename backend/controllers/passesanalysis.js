const Pass = require('../models/passes');
const Station = require('../models/stations');
const Vehicle = require('../models/vehicles');
const ISODateFromString = require('../helpers');

module.exports = async (req, res) => {
	try {
        let queryResults = await Pass.find({
            stationRef: {$in: await Station.distinct("stationId",{stationProvider: req.params.op1_ID})},
            vehicleRef: {$in: await Vehicle.distinct("vehicleId",{tagProvider: req.params.op2_ID})},
            timeStamp: {$gte: ISODateFromString(req.params.date_from), $lt: ISODateFromString(req.params.date_to)}
        });
        
        if (Object.keys(queryResults).length === 0){
            res.status(204).send("NO CONTENT");
        } else {
            res.status(200).json({
                op1_ID: req.params.op1_ID,
                op2_ID: req.params.op2_ID,
                RequestTimestamp: new Date().toISOString(),
                PeriodFrom: ISODateFromString(req.params.date_from),
                PeriodTo: ISODateFromString(req.params.date_to),
                NumberOfPasses: queryResults.length,
                PassesList: await Promise.all(queryResults.map(async (passElement, passInd) => ({
                    PassIndex: passInd+1,
                    PassTimeStamp: passElement.timeStamp,
                    StationID: passElement.stationRef,
                    VehicleID: passElement.vehicleRef,
                    TagProvider: (await Vehicle.findOne({VehicleID: passElement.vehicleRef})).tagProvider,
                    PassType: (await Vehicle.findOne({VehicleID: passElement.vehicleRef})).tagProvider 
                                == (await Station.findOne({stationId: passElement.stationRef})).stationProvider
                                ? "home" : "visitor",
                    PassCharge: passElement.charge
                })))
            });
        }
	} catch (error) {
        res.status(500).json({"Status":"Something went wrong!"});
	}
};