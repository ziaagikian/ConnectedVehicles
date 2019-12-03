const configs = {
    queueUrl : 'amqp://rabbitmq-service:5672?heartbeat=10s',
    queueName : 'connected-vehicles',
    userLogFile : '/path/'
}

module.exports = configs