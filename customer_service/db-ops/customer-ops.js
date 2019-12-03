

let customerList = require('../config/customer-data')


/**
 * Get customer List based on  User selction selected  
 * dev@neomeric.com
 * 
 * @param {*} selCustomer 
 */
let selectCustomerList = ((selCustomer) => {
    // console.log("skssk ", customerList.customerData.length)
    const lencustomerLst =  customerList.customerData.length 

    if(lencustomerLst < 0 || lencustomerLst < selCustomer.id){
        return helper.commonException('')
    }
        //return errorResponse();
    var selectedCustomer = []
    
    if(selCustomer && selCustomer.id && selCustomer.id > 0 ){
        var custID = selCustomer.id 
        customerList.customerData.forEach((custObj) =>{
            if(custObj.id == custID)
                selectedCustomer.push(custObj)
        })
        return selectedCustomer
    }
    
    return customerList.customerData;

})



module.exports = {selectCustomerList}