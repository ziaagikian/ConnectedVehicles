const ResponseUtils = require('../libs/response-utils')
const httpCodes = require('../libs/http-codes')
const respMessgs = require('../libs/response-messages')
const helper = require('../libs/helper')
const dynamicQueue = require('../communication/queue')
const queueParams = require('../libs/queue-params')
// let tokenMiddleware = require('../../middlewares/authentication/jwt');

const responseUtils = new ResponseUtils();

class CustomerControllers{

    /**
     * Get  Customer Info
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static getAllCustomers (req, res, next){
        dynamicQueue({
                action: queueParams.usersList,
                others:{

                }
        },queueParams.customerChannel)
        .then((customerList)=>{
            if(customerList.length > 0){
                responseUtils.setSuccess(true, httpCodes.OK, respMessgs.SUCCESS_MESSAGE, customerList)
                responseUtils.send(res)
              } else
                   throw "Customer List  not retrieved"
        }).catch((error) =>{
            helper.sendExceptionError(error, res)
        })
    }
}

module.exports = CustomerControllers