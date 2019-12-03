
var amqp = require('amqplib/callback_api');


const ResponseUtils = require('../libs/response-utils')
const httpCodes = require('../libs/http-codes')
const respMessgs = require('../libs/response-messages')
const responseUtils = new ResponseUtils();

let config = require('../config/environment')
// const amqpUrl = 'amqp://rabbitmq-service:5672'
const amqpUrl = 'amqp://' + config.amqpIp//+":" + config.amqpPorts
// const amqpUrl  = 'amqp://localhost'


/**
 * Handle Bidirectional Queue. Send, recieve commands to/from particular service.
 * @param {*} messageInfo 
 * @param {*} channelName 
 */
function publishMessageToQueue(messageInfo, channelName) {
    return new Promise((resolve, reject) => {
        try {

            amqp.connect(amqpUrl, function (err, conn) {
                if (err) {
                    queueError(reject)
                } else {
                    conn.createChannel(function (err, ch) {
                        if (err) {
                            queueError(reject)
                        } else {
                            let correlationId = generateUuid();
                            // ch.assertQueue(`${config.amqpChannelName}-${correlationId}`, {
                            ch.assertQueue(`${channelName}-${correlationId}`, {
                                exclusive: true,
                            }, function (err, q) {
                                ch.consume(q.queue, function (msg) {
                                    if (msg.properties.correlationId == correlationId) {
                                        //logger.success(' Success ', ' Response Recieved ');
                                        try {
                                            let replyFromService = msg.content.toString();
                                            replyFromService = JSON.parse(replyFromService);
                                            resolve(replyFromService);
                                        } catch (error) {
                                            console.error('Queue API GW', error)
                                            reject(error);
                                        }
                                        //Close Connection
                                        //  conn.close()
                                        setTimeout = (() => {
                                            conn.close();
                                            //  process.exit(0);
                                        }, config.queueTimeout);

                                    }
                                }, {
                                    noAck: true
                                });
                                console.log("Sending message to Queue ", JSON.stringify(messageInfo))
                                // ch.publish(q, 'message_queues', new Buffer(new_msg))
                                ch.sendToQueue(channelName,
                                    new Buffer(JSON.stringify(messageInfo)), {
                                    correlationId: correlationId,
                                    replyTo: q.queue
                                });
                            });
                        }
                    });
                }
            });
        } catch (error) {
            console.error('  Queue Error ', error);
            queueError(error)
        }
    });
}

function queueError(reject) {
    console.error('Queue API-GW', 'Rabbit MQ might be down or not responding');
    responseUtils.setError(httpCodes.INTERVAL_SERVER_ERROR, respMessgs.INTERVAL_SERVER_ERROR);
    reject(JSON.stringify(responseUtils));
}

/**
 * Unique Coorelation ID 
 */
function generateUuid() {
    return new Date().getTime().toString() + Math.random().toString() + Math.random().toString();

}
module.exports = publishMessageToQueue;