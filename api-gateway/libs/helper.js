
const ResponseUtils = require('../libs/response-utils')
const httpCodes = require('../libs/http-codes')
const respMessgs = require('../libs/response-messages')

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



module.exports = {sendExceptionError, commonException, sendAuthError, sendMessageToQueue}