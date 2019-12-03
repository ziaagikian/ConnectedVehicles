'use strict';

var env = process.env.NODE_ENV || 'dev';
console.log("Zeee ", env)
var config = require(`./${env}`);

module.exports = config;