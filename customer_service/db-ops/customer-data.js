const redisCache = require('../libs/redis-cache-driver')

const redisDriver  = new  redisCache()

let customerHash = "customer"



// const dbObj= new dbManager()
/**
* 
|-----------------------------------|
| Kalles Grustransporter AB         |
| Cementvägen 8, 111 11 Södertälje  |
|-----------------------------------|
| VIN (VehicleId)       Reg. nr.    |
|-----------------------------------|
| YS2R4X20005399401     ABC123      |
| VLUR4X20009093588     DEF456      |
| VLUR4X20009048066     GHI789      |
|-----------------------------------|

|-----------------------------------|
| Johans Bulk AB                    |
| Balkvägen 12, 222 22 Stockholm    |
|-----------------------------------|
| VIN (VehicleId)       Reg. nr.    |
|-----------------------------------|
| YS2R4X20005388011     JKL012      |
| YS2R4X20005387949     MNO345      |
------------------------------------|

|-----------------------------------|
| Haralds Värdetransporter AB       |
| Budgetvägen 1, 333 33 Uppsala     |
|-----------------------------------|
| VIN (VehicleId)       Reg. nr.    |
|-----------------------------------|
| YS2R4X20005387765     PQR678      |
| YS2R4X20005387055     STU901      |
|-----------------------------------|
      */
let seedCustomerData = async () => {

    // id => Primary Key
    const obj1 = { "id": 1, "name": "Kalles Grustransporter", "address": " AB Cementvägen 8 111 11 Södertälje" }
    const obj2 = { "id": 2, "name": "Johans Bulk ", "address": "AB Balkvägen 12 222 22 Stockholm" };
    const obj3 = { "id": 3, "name": "Haralds Värdetransporter", "address": " AB Budgetvägen 1 333 33 Uppsala" };
    
    return redisDriver.hmSet(customerHash, "1", JSON.stringify(obj1), "2",  JSON.stringify(obj2), "3", JSON.stringify(obj3) );


}

let getCustomerData = async ( hashIds) => {
    return redisDriver.hmGet(customerHash, hashIds);
}

let quitClient = () =>{
    console.log("Killing Connection")
    return redisDriver.quit();
} 

module.exports = { seedCustomerData, getCustomerData, quitClient }