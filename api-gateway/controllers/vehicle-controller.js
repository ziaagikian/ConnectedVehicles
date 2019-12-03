const dynamicQueue = require('../communication/queue')

const queueParams = require('../libs/queue-params')
const ResponseUtils = require('../libs/response-utils')
const httpCodes = require('../libs/http-codes')
const respMessgs = require('../libs/response-messages')
const validationMessages = require('../libs/validation-messages');
const helper = require('../libs/helper')

const responseUtils = new ResponseUtils();

class vehicleController {

    /**
     * Get Vehicle(s) based on Customer Ids
     * @param {*} req => Request
     * @param {*} res Response 
     * @param {*} next next action.
     */
    static /*async*/ getVehiclesByCustomerIds(req, res, next) {
        // try {
        req.checkBody('customerIds', validationMessages.empty).notEmpty();
        let validationErrors = req.validationErrors();
        if (validationErrors) {
            console.error("Customer Ids should not be empty", validationErrors)
            responseUtils.setError(httpCodes.PARAMS_MISSING, validationMessages.empty)
            responseUtils.send(res)
        } else {
            let customerIds = req.body.customerIds

            dynamicQueue({
                action: queueParams.vehiclesList,
                others: {
                    userIds: customerIds
                }

            }, queueParams.vehicleChannel).then((vehiclesList) => {
                if (vehiclesList.length > 0) {
                    responseUtils.setSuccess(true, httpCodes.OK, respMessgs.SUCCESS_MESSAGE, vehiclesList)
                    responseUtils.send(res)
                } else
                    throw "Vehicle List  not retrieved"
            }).catch((error) => {
                let errorMessage = "Vehicle List  not retrieved ".concat(error)
                helper.sendExceptionError(errorMessage, res)
            })
        }
    }

    /**
    * Get Vehicle by Status i-e Connected | Disconnected
    * @param {*} req => Request
    * @param {*} res Response 
    * @param {*} next next action.
     */

    static /*async*/ getVehiclesByStatus(req, res, next) {
        // try {
            dynamicQueue({
                action: queueParams.vehiclesListByStatus,
                others: {
                    status: req.query.type
                }
            }, queueParams.vehicleChannel).then((vehiclesList) => {
                if (vehiclesList.length > 0) {
                    responseUtils.setSuccess(true, httpCodes.OK, respMessgs.SUCCESS_MESSAGE, vehiclesList)
                    responseUtils.send(res)
                } else
                    throw "Vehicle List not retrieved"
            }).catch((error) => {
                let errorMessage = "Vehicle List  not retrieved ".concat(error)
                helper.sendExceptionError(errorMessage, res)
            })
    }

    /**
     * Ping API for Connected Vehicle
     * @param {*} req => Request
     * @param {*} res Response 
     * @param {*} next next action.
     */
    static pingVehicle(req, res, next) {

        req.checkBody('id', validationMessages.empty).notEmpty()
        req.checkBody('id', validationMessages.integer).isInt()
        // req.checkBody('latitude', validationMessages.empty).notEmpty();
        // req.checkBody('longitude', validationMessages.empty).notEmpty();
        let validationErrors = req.validationErrors();

        if (validationErrors) {
            console.error("Customer Ids should not be empty", validationErrors)
            responseUtils.setError(httpCodes.VALIDATION_ERROR, validationErrors)
            responseUtils.send(res)
        } else {
            let bodyParams = {
                id: req.body.id,
                // latitude : req.body.latitude,
                //longitude : req.body.longitude
            }

            dynamicQueue({
                action: queueParams.vehiclePing,
                others: bodyParams
            }, queueParams.vehicleChannel)
                .then((statusUpdated) => {
                    const updatedID = parseInt(statusUpdated.id)

                    if (updatedID > 0) {
                        const entities = []
                        entities.push(statusUpdated)

                        console.log("statusUpdated ", statusUpdated)
                        responseUtils.setSuccess(true, httpCodes.OK, respMessgs.SUCCESS_MESSAGE,
                            entities)
                        responseUtils.send(res)
                    } else
                        throw "Exception at Vehicle Ping API"

                }).catch((err) => {
                    let errorMessage = "Exception at Queue while getting  Vehicle List  ".concat(err)
                    helper.sendExceptionError(errorMessage, res)
                })
        }


    }

    /**
     * Vehicle  Config API, can be invoked before Simulation or Ping APIs
     * @param {*} req => Request
     * @param {*} res Response 
     * @param {*} next next action.
     */
    static configVehicles(req, res, next) {
        dynamicQueue({
            action: queueParams.vehicleConfig,
            others: {}
        }, queueParams.vehicleChannel)
            .then((vehicleIds) => {

                if (vehicleIds.length > 0) {
                    console.log("statusUpdated ", vehicleIds)
                    responseUtils.setSuccess(true, httpCodes.OK, respMessgs.SUCCESS_MESSAGE,
                        vehicleIds)
                    responseUtils.send(res)
                } else
                    throw "Exception at Vehicle Ping API"

            }).catch((err) => {
                let errorMessage = "Exception at Queue while getting  Vehicle Configs  ".concat(err)
                helper.sendExceptionError(errorMessage, res)
            })
    }
};


module.exports = vehicleController