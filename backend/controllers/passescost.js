const Pass = require('../models/passes');
const ISODateFromString = require('../helpers').ISODateFromString;
const ExpressError = require('../errorHandler')

module.exports = async (req, res, next) => {
	try {
        let queryResultsOp1 = await Pass.findPassesAnalysis(req.params.op1_ID, req.params.op2_ID,
            ISODateFromString(req.params.date_from),ISODateFromString(req.params.date_to));

        let queryResultsOp2 = await Pass.findPassesAnalysis(req.params.op2_ID, req.params.op1_ID,
            ISODateFromString(req.params.date_from),ISODateFromString(req.params.date_to));

        if ((Object.keys(queryResultsOp1).length === 0)&&((Object.keys(queryResultsOp1).length === 0))){
            next(new ExpressError("No content", 204));
        } else {
            res.status(200).json({
                op1_ID: req.params.op1_ID,
                op2_ID: req.params.op2_ID,
                RequestTimestamp: new Date().toISOString(),
                PeriodFrom: ISODateFromString(req.params.date_from),
                PeriodTo: ISODateFromString(req.params.date_to),
                PassesCost: (queryResultsOp1.map(q => q.charge).reduce((p,n) => p+n, 0)-
                            queryResultsOp2.map(q => q.charge).reduce((p,n) => p+n, 0)).toFixed(2)
            });
        }
	} catch (error) {
        next(new ExpressError(error.message, 500));
	}
};