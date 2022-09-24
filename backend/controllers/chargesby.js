const Pass = require('../models/passes');
const Station = require('../models/stations');
const Vehicle = require('../models/vehicles');
const ISODateFromString = require('../helpers');

module.exports = async (req, res) => {
    try {
		if (!(await Station.distinct('stationProvider')).includes(req.params.op_ID)){
			res.status(204).send("NO CONTENT");
		} else {
			res.status(200).json({
				op_ID : req.params.op_ID,
				RequestTimestamp: new Date().toISOString(),
				PeriodFrom: ISODateFromString(req.params.date_from),
				PeriodTo: ISODateFromString(req.params.date_to),
				PPOList: await Promise.all(((await Station.distinct('stationProvider')).filter(s => s != req.params.op_ID))
					.map(
						async s => ({
							VisitingOperator: s,
							PassesCost: (await Pass.find({
								stationRef: {$in: await Station.distinct("stationId",{stationProvider: req.params.op_ID})},
								vehicleRef: {$in: await Vehicle.distinct("vehicleId",{tagProvider: s})},
								timeStamp: {$gte: ISODateFromString(req.params.date_from), $lt: ISODateFromString(req.params.date_to)}
							})).map(q => q.charge).reduce((p,n) => p+n, 0).toFixed(2)
							- (await Pass.find({
								stationRef: {$in: await Station.distinct("stationId",{stationProvider: s})},
								vehicleRef: {$in: await Vehicle.distinct("vehicleId",{tagProvider: req.params.op_ID})},
								timeStamp: {$gte: ISODateFromString(req.params.date_from), $lt: ISODateFromString(req.params.date_to)}
							})).map(q => q.charge).reduce((p,n) => p+n, 0).toFixed(2)
						})
					)
				)
			})
		}
	} catch (error) {
        res.status(500).json({"Status":"Something went wrong!"});
	}
};