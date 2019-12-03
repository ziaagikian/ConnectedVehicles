const redis = require('redis')
const bluebird = require('bluebird')
const config = require('../config/config')
const httpCodes = require('./http-codes')


bluebird.promisifyAll(redis)

let createRedisClient = (url)  => {

    redisClient = redis.createClient({url,
        retry_strategy: function (options) {
            if (options.error && options.error.code === 'ECONNREFUSED') {
                // End reconnecting on a specific error and flush all commands with
                // a individual error
                console.error('ECONNREFUSED  ', options.error)
                return new Error('The server refused the connection');
            }
            if (options.total_retry_time > 1000 * 60 * 60) {
                // End reconnecting after a specific timeout and flush all commands
                // with a individual error
                console.error('Retried')
                return new Error('Retry time exhausted');
            }
            if (options.attempt > config.dbMaxRetries) {
                // End reconnecting with built in error
                console.error('Max Retries')
                return undefined;
            }
            // reconnect after
            return Math.min(options.attempt * 100, 3000);  // After  3 secs at min
        }
    })

    // redisClient.setName(customerKey)
    // })

    redisClient.on('connect', function () {
        console.log('Customer Service Redis client connected');
        return httpCodes.DB_CONNECTED
    });

    redisClient.on('error', function (error) {
        console.error('Customer Service Redis Error ' + error)
        return httpCodes.DB_CONNECTION_ERROR
    });


    return redisClient
}

module.exports = {createRedisClient}