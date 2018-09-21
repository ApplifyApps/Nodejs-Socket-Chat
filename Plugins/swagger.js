'use strict';
/**
 * Created by Zubin on 14/09/2018.
 */

//Register Swagger
var pack = require('../package'),
    swaggerOptions = {
        apiVersion: pack.version,
        pathPrefixSize: 2

    };

exports.register = function(server, options, next){

    server.register({
        register: require('hapi-swagger'),
        options: swaggerOptions
    }, function (err) {
        if (err) {
            server.log(['error'], 'hapi-swagger load error: ' + err)
        }else{
            server.log(['start'], 'hapi-swagger interface loaded')
        }
    });

    next();
};

exports.register.attributes = {
    name: 'swagger-plugin'
};