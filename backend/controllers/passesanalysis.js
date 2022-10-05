const Pass = require('../models/passes');
const Vehicle = require('../models/vehicles');
const ISODateFromString = require('../helpers').ISODateFromString;

module.exports = async (req, res) => {
	try {
        var queryResults = await Pass.findPassesAnalysis(req.params.op1_ID, req.params.op2_ID,
            ISODateFromString(req.params.date_from),ISODateFromString(req.params.date_to));
        
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
                    TagProvider: await Vehicle.findTagProviderByVehicleId(passElement.vehicleRef),
                    PassCharge: passElement.charge
                })))
            });
        }
	} catch (error) {
        res.status(500).json({"Status":error.message});
	}
};