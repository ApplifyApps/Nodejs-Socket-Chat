'use strict';

var Models = require('../Models');

//Get Chat from DB
var getChat = function (criteria, projection, options, callback) {
    Models.Chat.find(criteria, projection, options, callback);
};

//Insert Chat in DB
var createChat = function (objToSave, callback) {
    new Models.Chat(objToSave).save(callback)
};

//Update Chat in DB
var updateChat = function (criteria, dataToSet, options, callback) {
    Models.Chat.findOneAndUpdate(criteria, dataToSet, options, callback);
};


//Delete Chat in DB
var deleteChat = function (criteria, callback) {
    Models.Chat.findOneAndRemove(criteria, callback);
};

var aggregateChat = function (criteria, callback) {
    Models.Chat.aggregate(criteria, callback);
};

var populateChat = function(criteria,projection,options,populate,populateOptions,callback){
    Models.Chat.find(criteria,projection,options).populate(populate,populateOptions).exec(callback);
};

var findByAggregateAndPopulate = function (criteria, callback) {
    Models.Chat.aggregate(criteria, callback);
};

module.exports = {
    getChat: getChat,
    updateChat: updateChat,
    deleteChat: deleteChat,
    createChat: createChat,
    aggregateChat: aggregateChat,
    populateChat: populateChat,
    findByAggregateAndPopulate: findByAggregateAndPopulate
};

