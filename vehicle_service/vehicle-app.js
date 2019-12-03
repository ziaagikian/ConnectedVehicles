const dbSeeder = require('./db-seeder/vehicle-data')
const userRMQ = require('./RMQ/queue-service')

 startUserMicroserve = () => {
 
    // Run DB seeder scripts for user microservice
    dbSeeder.seedVehicleData();

    // Initiate AQMP service
    userRMQ.startVehicleQueue()
}

startUserMicroserve()
