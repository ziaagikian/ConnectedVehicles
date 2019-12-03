/**
 * Common class for handing response. Response rules are  defined here.
 * 
 */

class ResponseUtils{

    constructor(){
        this.success = false;
        this.statusCode = null;
        this.message = null;
        this.data = null;
    }

    /**
     * Setting Success Message
     * @param {*} success 
     * @param {*} statusCode 
     * @param {*} message 
     * @param {*} data 
     */
    setSuccess(success = true, statusCode, message, data/*, count =1*/){
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    /**
     * Setting Error Message
     * @param {*} statusCode 
     * @param {*} message 
     */
    setError(statusCode, message){
        this.success = false;
        this.statusCode = statusCode;
        this.message = message;
        this.data = []
    }

    /**
     * Send generated response to attached client(s)
     * @param {*} res 
     */
    send(res){
        const result={
            success: this.success,
            statusCode: this.statusCode,
            message:this.message,
            entities: this.data
            
        }
        res.status(this.statusCode).json(result);
    }
       
}

module.exports = ResponseUtils