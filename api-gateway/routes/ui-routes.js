var express = require('express');
var router = express.Router();
let tokenMiddleware = require('../middlewares/jwt');


const  uiController = require('../controllers/ui-controller')

// Define Endpoints
router.get('/status',tokenMiddleware, uiController.getUiStatuses);

module.exports = router 