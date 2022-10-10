const Pass = require('../models/passes');
const Station = require('../models/stations');
const ISODateFromString = require('../helpers').ISODateFromString;

module.exports = async (req, res) => {
    try {
		if (!(await Station.distinct('stationProvider')).includes(req.params.op_ID)){
			// res.status(204).send("NO CONTENT");
            next(new ExpressError("No content", 204));
		} else {
			res.status(200).json({
				op_ID : req.params.op_ID,
				RequestTimestamp: new Date().toISOString(),
				PeriodFrom: ISODateFromString(req.params.date_from),
				PeriodTo: ISODateFromString(req.params.date_to),
				PPOList: await Promise.all(((await Station.distinct('stationProvider')).filter(op => op != req.params.op_ID))
					.map(
						async op => ({
							VisitingOperator: op,
							PassesCost: ((await Pass.findPassesAnalysis(op, req.params.op_ID,
								ISODateFromString(req.params.date_from),ISODateFromString(req.params.date_to)))
								.map(q => q.charge).reduce((p,n) => p+n, 0)
								- (await Pass.findPassesAnalysis( req.params.op_ID, op,
								ISODateFromString(req.params.date_from),ISODateFromString(req.params.date_to)))
								.map(q => q.charge).reduce((p,n) => p+n, 0)).toFixed(2)
						})
					)
				)
			})
		}
	} catch (error) {
        // res.status(500).json({"Status":"Something went wrong!"});
        next(new ExpressError(error.message, 500));
	}
};