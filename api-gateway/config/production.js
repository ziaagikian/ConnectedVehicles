
module.exports = {
    env: 'production',
    serverIp: process.env.SERVER_IP,
    serverPort: process.env.SERVER_PORT,
    secretKey: process.env.SECRET_KEY,
    
    amqpIp: process.env.AMQP_IP  || 'rabbitmq-service',
    amqpPort: process.env.AMQP_PORT,
    queueTimeout : process.env.QUEUR_TIMEOUT | 5 * 1000, // Default 5 seconds
    logFile: process.env.LOG_FILE,
}