var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var validator = require('express-validator');
var cors= require('cors')
// Self Healing or Hystrix  System
const dashboard = require('hystrix-dashboard');
const commandFactory = require('express-hystrix');
const toobusy = require('hystrix-too-busy');


// For Service Registery
require('dotenv').config(); 


//TODO Better to expose Separate API Gateways and remove subfolder

var vehiclesRouter = require('./routes/vehicle-routes')
var customersRouter = require('./routes/customer-routes') 
 var uiRouter = require('./routes/ui-routes')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//API Orchestration
app.use('/api/v1/vehicles', vehiclesRouter);
app.use('/api/v1/customers', customersRouter);
app.use('/api/v1/dashboard', uiRouter); 

// Hystrix Dashboard 
app.use('/hystrix',dashboard({
    idleTimeout: 4000,  // will emit "ping if no data comes within 4 seconds,
    interval: 2000  ,   // interval to collect metrics
    proxy: true   ,     // enable proxy for stream
}));


// Fallback Mechanism
app.use(commandFactory({
    hystrix: {
        default: {
            circuitBreakerErrorThresholdPercentage: 50,
            circuitBreakerForceClosed: false,
            circuitBreakerForceOpened: false,
            circuitBreakerSleepWindowInMilliseconds: 1000,
            maxConcurrentConnections: 10
        }
    },
    commandStatusResolver: (req, res) => {
        if (res && res.statusCode === 403) {
            return Promise.reject(new Error('Bad path'));
        }
        return Promise.resolve();
    }
}));

// handle open circuit here
app.use((err, req, res, next) => {
    if (err && err.message === 'OpenCircuitError') {
        res.status(500).end('Circuit is open');
    }
    next(err);
});


/**
 * Initialize Too Busy  factory
 * 
 * @param {*} config 
 */
let tooBusyFactory  = () =>{
    toobusy.init();

    return function commandExecutor(command, req, res, next) {
        return new Promise((resolve, reject) => {
            // in case aggregate too-busy singal across
            // all command, then do not pass a command below
            toobusy.getStatus(command, busy => {
                setImmediate(next);
                if (busy) {
                    return reject(new Error('TooBusy'));
                }
                resolve();
            });
        });
    };
}
 
 // Handle toobusy here
 app.use(commandFactory({
    commandExecutorFactory: tooBusyFactory
}));


module.exports = app;
