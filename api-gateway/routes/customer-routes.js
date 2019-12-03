var express = require('express');
var router = express.Router();

let tokenMiddleware = require('../middlewares/jwt');

const customerController = require('../controllers/customer-controllers')

router.get('/', tokenMiddleware, customerController.getAllCustomers)



module.exports = router

