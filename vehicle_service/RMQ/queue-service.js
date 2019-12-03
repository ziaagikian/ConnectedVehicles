const amqp = require('amqplib/callback_api');

const queueParams = require('../libs/queue-params')
const serviceConfig = require('../config/config')
const vehicleOps = require('../db-ops/vehicleOps')
const helper = require('../libs/helper')

/**
 * Start Vehicle Queue Channel
 */
let startVehicleQueue = () => {
    amqp.connect(serviceConfig.queueUrl, function (err, conn) {
        if (err) {
            console.error('Vehicle queue', 'Queue Error', err);

        } else {
            conn.createChannel(function (err, ch) {
                if (err) {
                    console.error('Vehicle queue', 'Queue Error', err);
                } else {

                    var q = queueParams.vehicleChannel;
                    ch.assertQueue(q, {
                        durable: false
                    });

                    ch.prefetch(1);
                    console.log(q, 'Live', 'Microservice is listening');
                    ch.consume(q, function reply(msg) {
                        let result = msg.content.toString();
                        result = JSON.parse(result);

                        var command;

                        switch (result.action) {
                            case queueParams.vehiclesList:
                                command = vehicleOps.selectVehicleByUserIds(result.others);
                                break;

                            case queueParams.vehiclesListByStatus:
                                command = vehicleOps.selectVehiclesByStatus(result.others);
                                break;

                            case queueParams.vehiclePing:
                                command = vehicleOps.pingVehicle(result.others);
                                break;

                            case queueParams.vehicleConfig:
                                command = vehicleOps.configVehicles(result.others)
                                break;

                            default:
                                command = vehicleOps.errorResponse();
                                break;
                        }

                        try {
                            helper.sendMessageToQueue(ch, msg, command)
                        } catch (error) {

                            console.error('Vehicle Queue Error', error);
                            var queueError = helper.commonException('Vehicle Queue Error')
                            helper.sendMessageToQueue(ch, msg, queueError)
                        }
                    });
                }
            });
        }
    });
}

module.exports = { startVehicleQueue }