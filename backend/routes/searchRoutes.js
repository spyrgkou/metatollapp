const router = require('express').Router();
const PassesPerStation = require('../controllers/passesperstation');
const PassesAnalysis = require('../controllers/passesanalysis');
const PassesCost = require('../controllers/passescost');
const ChargesBy = require('../controllers/chargesby');

router.get('/passesperstation/:stationID/:date_from/:date_to', PassesPerStation);
router.get('/passesperanalysis/:op1_ID/:op2_ID/:date_from/:date_to', PassesAnalysis);
router.get('/passescost/:op1_ID/:op2_ID/:date_from/:date_to', PassesCost);
router.get('/ChargesBy/:op_ID/:date_from/:date_to', ChargesBy);

module.exports = router;