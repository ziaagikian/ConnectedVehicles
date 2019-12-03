/**
 * Common Actions distributted  across the services and can be managed
 * by Gateway.  Only Gateway developers can edit this  file.
 * The entries is dependent upon the different 
 * numbber of Queue Actions required. 
 */

const queueParams ={

    vehicleChannel : 'vehicle-channel',
    customerChannel: 'customer-channel',
    usersList : 'userlist',
    vehiclesList : 'vehicleslist',
    vehiclesListByStatus: 'vehiclesListByStatus',
    vehiclePing: 'vehiclePing',
    vehicleConfig : 'vehicleConfig',
    queueTimeout : 5 *  1000,  // 5 seconds

    dashboardVehicleList:  'dashboardVehicleList',
    filterByStatus: 'filterByStatus',
    filterByCustomer: 'filterByCustomer'
}

module.exports = queueParams