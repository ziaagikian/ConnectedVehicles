
module.exports ={
    env: 'test',
    serverIp: process.env.SERVER_IP,
    serverPort: process.env.SERVER_PORT,
    secretKey: process.env.SECRET_KEY,
    
    amqpIp: process.env.AMQP_IP  || 'rabbitmq-service',
    logFile: process.env.LOG_FILE,
}