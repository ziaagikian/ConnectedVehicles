// For getting Server Time 
var moment = require('moment')
let vehicleList = require('../config/vehicle-data')
const httpCodes = require('../libs/http-codes')
const responseMsgs = require('../libs/response-messages')
const ResponseUtils = require('../libs/response-utils')

const responseUtils = new ResponseUtils();

/**
 * Select List of vehicles using CustomerIgs
 * @param {Json Arrays of Ids} customerIds 
 */
let selectVehicleByUserIds = ((params) => {
  let selectedVehicles = []
  vehicleList.vehicleData.forEach((e1) => params.userIds.forEach((e2) => {

    if (params.status) {
      if (e1.userId == e2.id && params.status == e1.status)
        selectedVehicles.push(e1)
    } else {
      if (e1.userId == e2.id)
        selectedVehicles.push(e1)
    }
  }))

  return selectedVehicles;

})

/**
 * Send Vehicle  by status
 * @param {*} selectedStatus 
 */
// status.staus
let selectVehiclesByStatus = ((selectedStatus) => {
  let selectedVehicles = []
  if(!selectedStatus.status)
    return vehicleList.vehicleData

  vehicleList.vehicleData.forEach((e1) => {
    
    if (e1.status.trim() == selectedStatus.status.trim())
      selectedVehicles.push(e1)

  })
  return selectedVehicles
})

/**
 * Insert real time Data in Vehicle Array
 * @param {*} realTimeData 
 */

let pingVehicle = ((realTimeData) => {
  let indexID = realTimeData.id
  if (indexID > 0 && indexID <= vehicleList.vehicleData.length) {

    vehicleList.vehicleData[indexID - 1].last_updated = getCurrentTime('HH:mm:ss')
    vehicleList.vehicleData[indexID - 1].status = "connected"
    return vehicleList.vehicleData[indexID - 1];
  }
  return false;

})

let configVehicles = ((bodyParams) => {
  if (vehicleList.vehicleData.length > 0) {
    return vehicleList.vehicleData.map(vehicle => vehicle.id);
  }
  return;
})

let getCurrentTime = ((format) => {
  return moment().format(format)
})

/**
 * Success Response Simulator
 * @param {*} data 
 */
let successResponse = ((data) => {
  responseUtils.setSuccess(true, httpCodes.OK, responseMsgs.VEHICLES_LIST, data)
  return responseUtils
})

module.exports = { selectVehicleByUserIds, selectVehiclesByStatus, pingVehicle, configVehicles }