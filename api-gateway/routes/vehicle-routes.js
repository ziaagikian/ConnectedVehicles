var express = require('express');
var router = express.Router();

let tokenMiddleware = require('../middlewares/jwt');

const vehicleController = require('../controllers/vehicle-controller')

// Define Endpoints
// Filter by Customer IDs
router.post('/customers',  tokenMiddleware, vehicleController.getVehiclesByCustomerIds)
// Filtered by Status
router.get('/status',  tokenMiddleware, vehicleController.getVehiclesByStatus)
// Ping IP for Vehicle(s) Simulator
router.post('/ping', tokenMiddleware,vehicleController.pingVehicle)
// Vehicle Ids for Simulator
router.get('/configs',tokenMiddleware, vehicleController.configVehicles) 


module.exports = router 