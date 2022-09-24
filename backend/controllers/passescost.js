const Pass = require('../models/passes');
const Station = require('../models/stations');
const Vehicle = require('../models/vehicles');
const ISODateFromString = require('../helpers');

module.exports = async (req, res) => {
	try {
        let queryResultsOp1 = await Pass.find({
            stationRef: {$in: await Station.distinct("stationId",{stationProvider: req.params.op1_ID})},
            vehicleRef: {$in: await Vehicle.distinct("vehicleId",{tagProvider: req.params.op2_ID})},
            timeStamp: {$gte: ISODateFromString(req.params.date_from), $lt: ISODateFromString(req.params.date_to)}
        });

        let queryResultsOp2 = await Pass.find({
            stationRef: {$in: await Station.distinct("stationId",{stationProvider: req.params.op2_ID})},
            vehicleRef: {$in: await Vehicle.distinct("vehicleId",{tagProvider: req.params.op1_ID})},
            timeStamp: {$gte: ISODateFromString(req.params.date_from), $lt: ISODateFromString(req.params.date_to)}
        });
        
        if ((Object.keys(queryResultsOp1).length === 0)&&((Object.keys(queryResultsOp1).length === 0))){
            res.status(204).send("NO CONTENT");
        } else {
            res.status(200).json({
                op1_ID: req.params.op1_ID,
                op2_ID: req.params.op2_ID,
                RequestTimestamp: new Date().toISOString(),
                PeriodFrom: ISODateFromString(req.params.date_from),
                PeriodTo: ISODateFromString(req.params.date_to),
                PassesCost: queryResultsOp1.map(q => q.charge).reduce((p,n) => p+n, 0).toFixed(2)-
                            queryResultsOp2.map(q => q.charge).reduce((p,n) => p+n, 0).toFixed(2)
            });
        }
	} catch (error) {
        res.status(500).json({"Status":"Something went wrong!"});
	}
};