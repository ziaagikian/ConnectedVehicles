
module.exports = {
    env: 'dev',
    serverIp: process.env.SERVER_IP,
    serverPort: process.env.SERVER_PORT,
    secretKey: process.env.SECRET_KEY,
    
    amqpIp: process.env.AMQP_IP || 'rabbitmq-service',
    amqpPort:4369,
    logFile: process.env.LOG_FILE,
    testJwtToken : process.env.testToken || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTU3NDM0OTYzNiwiZXhwIjoxNjA1OTA3MjM2fQ.q13N2siftymEvCl8RNXXYkqzuASbm5bYvaoF1jIMV-w'
}