const configs = {
    queueUrl : 'amqp://rabbitmq-service:5672?heartbeat=10s',
    queueName : 'connected-vehicles',
    userLogFile : '/path/',

    dbDialect:'redis',
    dbIP : 'redis',
    dbPort : 6379,
    dbUsername: 'admin',
    dbPassword : 'admin' ,// Encrypted format
    dbMaxRetries : 10 
}

module.exports = configs