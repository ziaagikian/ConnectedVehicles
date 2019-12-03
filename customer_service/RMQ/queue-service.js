const amqp = require('amqplib/callback_api');

const queueParams = require('../libs/queue-params')
const serviceConfig = require('../config/config')
const customerOps = require('../db-ops/customer-data')
const helper = require('../libs/helper')

/**
 * Start Customer Queue
 */
let startCustomerQueue = () => {
    amqp.connect(serviceConfig.queueUrl, function (err, conn) {
        if (err) {
            console.error('Customer queue', 'Queue Error', err);
        } else {
            conn.createChannel(function (err, ch) {
                if (err) {
                    console.error('Customer queue', 'Queue Error', err);
                } else {
                    var q = queueParams.customerChannel
                    ch.assertQueue(q, {
                        durable: false
                    });

                    ch.prefetch(1);
                    console.log(q, 'Live', 'Customer Microservice is listening');
                    ch.consume(q, function reply(msg) {
                        let result = msg.content.toString();
                        result = JSON.parse(result);

                        switch (result.action) {
                            case queueParams.usersList:
                                var selectedId = result.others.id
                                
                                if(!selectedId)
                                    selectedId = [1,2,3]
                                customerOps.getCustomerData(selectedId)
                                    .then((customerList) => {
                                        if (customerList){
                                            var JsonFormat = []
                                            customerList.forEach(element => {let  jsonObj = JSON.parse(element); JsonFormat.push(jsonObj)});
                                            helper.sendMessageToQueue(ch, msg, JsonFormat)
                                        }
                                        else {
                                            var noData = helper.noDataFoundError()
                                            helper.sendMessageToQueue(ch, msg, noData)

                                        }
                                    })
                                break;
                            default:
                                var errorException = helper.commonException('')
                                helper.sendMessageToQueue(ch, msg, errorException)
                                console.error("err ", errorException)
                                break;
                        }
                    });
                }
            });
        }
    });
}


module.exports = { startCustomerQueue }