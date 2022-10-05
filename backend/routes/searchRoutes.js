const router = require('express').Router();
const PassesPerStation = require('../controllers/passesperstation');
const PassesAnalysis = require('../controllers/passesanalysis');
const PassesCost = require('../controllers/passescost');
const ChargesBy = require('../controllers/chargesby');
const checkAuth = require('../middleware/checkauth');
const permissionAuth = require('../middleware/permissionAuth');

router.use(checkAuth);
router.get('/passesperstation/:stationID/:date_from/:date_to', permissionAuth('admin','operator'), PassesPerStation);
router.get('/passesperanalysis/:op1_ID/:op2_ID/:date_from/:date_to', permissionAuth('admin','operator'), PassesAnalysis);
router.get('/passescost/:op1_ID/:op2_ID/:date_from/:date_to', permissionAuth('admin','operator'), PassesCost);
router.get('/ChargesBy/:op_ID/:date_from/:date_to', permissionAuth('admin','operator'), ChargesBy);

module.exports = router;