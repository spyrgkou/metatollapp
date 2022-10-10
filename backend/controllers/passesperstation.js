const Pass = require('../models/passes');
const Station = require('../models/stations');
const Vehicle = require('../models/vehicles');
const ISODateFromString = require('../helpers').ISODateFromString;

module.exports = async (req, res, next) => {
	try {
        var queryResults = await Pass.findPassesPerStation(req.params.stationID, ISODateFromString(req.params.date_from),ISODateFromString(req.params.date_to));
        
        if (Object.keys(queryResults).length === 0){
            // res.status(204).send("NO CONTENT");
            next(new ExpressError("No content", 204));
        } else {
            res.status(200).json({
                Station: req.params.stationID,
                StationOperator:  await Station.findOperatorByStationId(req.params.stationID),
                RequestTimestamp: new Date().toISOString(),
                PeriodFrom: ISODateFromString(req.params.date_from),
                PeriodTo: ISODateFromString(req.params.date_to),
                NumberOfPasses: queryResults.length,
                PassesList: await Promise.all(queryResults.map(async (passElement, passInd) => ({
                    PassIndex: passInd+1,
                    PassTimeStamp: passElement.timeStamp,
                    VehicleID: passElement.vehicleRef,
                    TagProvider: await Vehicle.findTagProviderByVehicleId(passElement.vehicleRef),
                    PassType: await Vehicle.findTagProviderByVehicleId(passElement.vehicleRef)
                            == await Station.findOperatorByStationId(req.params.stationID)
                            ? "home" : "visitor",
                    PassCharge: passElement.charge
                })))
            });
        }
	} catch (error) {
        // res.status(500).json({"Status":error.message});
        next(new ExpressError(error.message, 500));
	}
};