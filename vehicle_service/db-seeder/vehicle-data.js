var  vehicleObj = require('../config/vehicle-data')


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
 seedVehicleData  =() =>  {
     
console.log("Seeding Vehicle data")
    // id => Primary Key,
    // userID => foreign Key
    const obj1 = {"id": 1, "vin":"YS2R4X20005399401","reg_num":"ABC123","status":"disconnected", "last_updated":"", "userId":1 }
    const obj2 = {"id": 2, "vin":"VLUR4X20009093588","reg_num":"DEF456","status":"disconnected", "last_updated":"", "userId":1 };
    const obj3 = {"id": 3, "vin":"VLUR4X20009048066","reg_num":"GHI789","status":"disconnected", "last_updated":"", "userId":1 };
    
    const obj4 = {"id": 4, "vin":"YS2R4X20005388011","reg_num":"JKL012","status":"disconnected", "last_updated":"", "userId":2 };
    const obj5 = {"id": 5, "vin":"YS2R4X20005387949","reg_num":"MNO345","status":"disconnected", "last_updated":"", "userId":2 };

    const obj6 = {"id": 6, "vin":"YS2R4X20005387765","reg_num":"PQR678","status":"connected", "last_updated":"", "userId":3 };
    const obj7 = {"id": 7, "vin":"YS2R4X20005387055","reg_num":"STU901","status":"disconnected", "last_updated":"", "userId":3 };

    vehicleObj.vehicleData.push(obj1)
    vehicleObj.vehicleData.push(obj2)
    vehicleObj.vehicleData.push(obj3)
    vehicleObj.vehicleData.push(obj4)
    vehicleObj.vehicleData.push(obj5)
    vehicleObj.vehicleData.push(obj6)
    vehicleObj.vehicleData.push(obj7)

}

module.exports = {seedVehicleData}