const jwt = require('jsonwebtoken')

let config = require('../config/environment')
const httpCodes = require('../libs/http-codes')
const helper = require('../libs/helper')

/**
 * @implements token  validation. If token is expired or  emty, the
 * request is locked.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} nex 
 */
let verifyToken = ((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    // if(token  == null){
    //     res.json(httpCodes.UNAUTHORIZED).status(httpCodes.UNAUTHORIZED)
    //     return
    // }
    if (token && token.startsWith('Bearer')) {
        //remove Bearer
        token = token.slice(7, token.length);
    }
    if (token) {
        console.log("Token ::", token)
        jwt.verify(token, config.secretKey, (error, decoded) => {
            if (error) {
                console.error("Error ==> ", error)
                helper.sendAuthError(res);
                return
            }
            // Passed request 
            next();
        })
    } else {
        return helper.sendAuthError(res)
    }
})

module.exports = verifyToken