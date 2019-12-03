const ResponseUtils = require('../libs/response-utils')
const httpCodes = require('../libs/http-codes')
const respMessgs = require('../libs/response-messages')
const helper = require('../libs/helper')
const dynamicQueue = require('../communication/queue')
const queueParams = require('../libs/queue-params')

const responseUtils = new ResponseUtils();


class uiController {

    /**
     * Send Realtime UI status to WebApp.
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static  /*async*/ getUiStatuses(req, res/* ,  tokenMiddleware */, next) {
        
        let vehicleStatus = req.query.status
        let  customerId = req.query.customer;
        console.log("Customer  IDs ", customerId)
        var usersList;
        //  Send Request to Customer Microservice
        dynamicQueue({
            action: queueParams.usersList,
            others: {id : customerId}
        }, queueParams.customerChannel)
            .then((userLists) => {
            
                if (userLists <= 0)
                    throw respMessgs.DATA_NOT_FOUND
                // if(userLists.length > 0){
                usersList = userLists;
                let ids = usersList.map(function (arr) {
                    return { "id": arr.id };
                });
                // Get Responce from Vehicle Microservice
                dynamicQueue({
                    action: queueParams.vehiclesList,
                    others: {
                        userIds: ids,
                        status: vehicleStatus
                    }

                }, queueParams.vehicleChannel).then((vehiclesList) => {
                    if (vehiclesList.length > 0) {
                        //  Aggregate Both Responses
                        let aggreList = aggregatedRespnseList(usersList, vehiclesList)
                        responseUtils.setSuccess(true, httpCodes.OK, respMessgs.SUCCESS_MESSAGE, aggreList)
                        responseUtils.send(res)
                    } else
                        throw respMessgs.DATA_NOT_FOUND
                }).catch((error) => {
                    helper.sendExceptionError(error, res)
                    
                })
            }).catch((error) => {
                helper.sendExceptionError(error, res)
            })
    }

}

/**
 * Aggregate Users and Vehicle List and send  it back
 * @param {*} usersList 
 * @param {*} vehiclesList 
 */
function  aggregatedRespnseList (usersList, vehiclesList) {
    let aggreList = []
    let lenCust = usersList.length
    let lenVeh = vehiclesList.length

    for (let i = 0; i < lenVeh; i++) {
        let vehObj = vehiclesList[i]
        for (let j = 0; j < lenCust; j++) {
            let custObj = usersList[j]

            if (vehObj.userId == custObj.id) {
                let aggrObj = {
                    "id": vehObj.id, "name": custObj.name, "address": custObj.address, "vin": vehObj.vin, "reg_num": vehObj.reg_num,
                    "status": vehObj.status, "last_updated": vehObj.last_updated
                }
                aggreList.push(aggrObj)
            }

        }
    }
    return aggreList
}

module.exports = uiController