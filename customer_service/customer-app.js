const dbSeeder = require('./db-ops/customer-data')
const customerRMQ = require('./RMQ/queue-service')

 startUserMicroserve = () => {
 
    // Run DB seeder scripts for user microservice
     dbSeeder.seedCustomerData();

    // Initiate AQMP service
    customerRMQ.startCustomerQueue()

    // Quit Redis client for this instant
    // dbSeeder.quitClient()


}

startUserMicroserve()

