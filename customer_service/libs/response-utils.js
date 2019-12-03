class ResponseUtils{

    constructor(){
        this.success = false;
        this.statusCode = null;
        this.message = null;
        this.data = null;
    }

    setSuccess(success = true, statusCode, message, data/*, count =1*/){
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    
    setError(statusCode, message){
        this.success = false;
        this.statusCode = statusCode;
        this.message = message;
        this.data = []
    }

    send(res){
        const result={
            success: this.success,
            statusCode: this.statusCode,
            message:this.message,
            entities: this.data
            
        }
        res.status(this.statusCode).json(result);

        // if(this.success)
        //     return res.status(this.statusCode).json(result)
        // else
        //     return res.status(this.s)
    }
       
}

module.exports = ResponseUtils