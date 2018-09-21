'use strict';
var config = require('config');


var mongo = {
    URI: "mongodb://"+config.get("mongo.username")+":"+ config.get("mongo.password") + "@localhost:27017/"+ config.get("mongo.db"),
    port: 27017
};

module.exports = {
    mongo: mongo
};
