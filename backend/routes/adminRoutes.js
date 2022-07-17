const router = require('express').Router();
const HealthCheck = require('../controllers/healthcheck');
// const ResetPasses = require('../controllers/resetpasses');
const ResetStations = require('../controllers/resetstations');
const ResetVehicles = require('../controllers/resetvehicles');

router.get('/admin/healthcheck', HealthCheck);
// router.post('/resetpasses', ResetPasses);
router.post('/admin/resetstations', ResetStations);
router.post('/admin/resetvehicles', ResetVehicles);

module.exports = router;