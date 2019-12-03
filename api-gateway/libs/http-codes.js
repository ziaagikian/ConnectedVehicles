
/**
 * Uniquw Response codes across all Microservices 
 * 
 * 1XX => Informational [Internal]
 * 2XX => HTTP Success Codes [External]
 * 3XX => Network Directional Errors [Networking]
 * 4XX => HTTP Error Codes [External]
 * 5XX => Database Error Codes [External]
 */

const httpCodes = {

    DB_CONNECTED:100, // 100x

    OK: 200,  // 
    CREATED: 201,
    NO_DATA: 204,
    
    PARAMS_MISSING: 300,
    INVALID_PARAMS: 301,
    
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    VALIDATION_ERROR: 410,
   
    INTERVAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    DB_ERROR: 504,
    DB_CONNECTION_ERROR: 505,

    //INTERNAL_QUEUE_ERROR: 600,
}

module.exports = httpCodes;