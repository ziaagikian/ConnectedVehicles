
const ResponseUtils = require('../libs/response-utils')
const httpCodes = require('../libs/http-codes')
const respMessgs = require('../libs/response-messages')
const config = require('../config/config')

const responseUtils = new ResponseUtils();

/**
 * Send/log Exception response 
 * @param {*} message Error Message
 * @param {*} resHandler Response Handler
 */

 let sendExceptionError = ((message, resHandler) =>{
    // console.error(message)
    responseUtils.setError(httpCodes.INTERVAL_SERVER_ERROR, respMessgs.INTERVAL_SERVER_ERROR)
    responseUtils.send(resHandler)
})

/**
 * Common Exception Object
 */
 let commonException  = ((message) =>{
    if(message && message!= '')
        console.error(message)
    responseUtils.setError(httpCodes.INTERVAL_SERVER_ERROR, respMessgs.INTERVAL_SERVER_ERROR)
    return responseUtils
})


/**
 * Send  Authentication based to response handler
 * @param {*} responseHandler 
 */
let sendAuthError= ((responseHandler)=>{
    console.error(respMessgs.AUTHORIZED_ERROR)
    responseUtils.setError(httpCodes.UNAUTHORIZED,respMessgs.AUTHORIZED_ERROR );
    responseUtils.send(responseHandler)
})

/**
 * Send No data found error
 */
let noDataFoundError = ()=> {
    responseUtils.setError(httpCodes.NO_DATA, respMessgs.CUSTOMER_NOT_FOUND)
    return responseUtils
}

/**
 * Send response Object to the given Queue Channel
 * @param {*} channel 
 * @param {*} message 
 * @param {*} response 
 */
let sendMessageToQueue = ((channel, message, response) =>{
    channel.sendToQueue(message.properties.replyTo,
        new Buffer(JSON.stringify(response)), {
        correlationId: message.properties.correlationId
    });
    channel.ack(message);
})

let createDBUrl = () =>{
    return config.dbDialect  + "://" + config.dbIP+":" + config.dbPort;
}



module.exports = {sendExceptionError, commonException, sendAuthError, noDataFoundError,
    sendMessageToQueue, createDBUrl}