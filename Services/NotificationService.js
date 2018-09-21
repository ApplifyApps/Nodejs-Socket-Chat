'use strict';

var Models = require('../Models');

//Get Users from DB
var getNotification = function (criteria, projection, options, callback) {
    Models.Notifications.find(criteria, projection, options, callback);
};

//Insert User in DB
var createNotification = function (objToSave, callback) {
    new Models.Notifications(objToSave).save(callback)
};

//Update User in DB
var updateNotification = function (criteria, dataToSet, options, callback) {
    Models.Notifications.findOneAndUpdate(criteria, dataToSet, options, callback);
};

module.exports = {
    getNotification: getNotification,
    createNotification: createNotification,
    updateNotification: updateNotification
};

