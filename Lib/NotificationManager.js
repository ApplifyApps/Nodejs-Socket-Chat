'use strict';
/**
 * Created by Zubin on 14/09/2018.
 */
var Configuration = require('../Configuration');
var async = require('async');
var Service = require('../Services');
var ObjectId = require('mongodb').ObjectId;
var config = require('config');

function renderMessageFromTemplateAndVariables(templateData, variablesData) {
    var Handlebars = require('handlebars');
    return Handlebars.compile(templateData)(variablesData);
};

function sendPushNotificationMessage(userId,notificationType,variables,sender,chatId) {
    var message = notificationType.message;
    if (variables && variables != null) {
        message = renderMessageFromTemplateAndVariables(notificationType.message, variables);
    }
    var criteria = {
        _id: userId
    };
    Service.UserService.getUser(criteria, {}, {lean: true}, function (err, data) {
        if (err)
            console.log('implementation error');
        else {
            if (data && data[0]) {
                var deviceToken = data[0].deviceToken;
                var payload = {
                    flag: notificationType.flag,
                    userId: userId
                };

                var push_info = {
                    'message': message,
                    'flag': notificationType.flag,
                    'userId': userId
                };

                if (sender && sender != null) {
                    push_info.senderId = sender;
                    payload.senderId = sender;
                }

                if (sender && sender != null) {
                    push_info.chatId = chatId;
                    payload.chatId = chatId;
                }

                sendFCMPush(deviceToken, push_info, notificationType.flag, message, 0, {}, notificationType.flag, function (err, data) {
                    if (err)
                        console.log('err', err);
                });
                SaveNotification(userId, push_info);
            } else console.log('no user found');
        }
    })
};

function SaveNotification(userId, payload){
    var exist = true;
    async.series([
        function(cb){
            var criteria = {
                user: ObjectId(userId)
            };
            Service.NotificationService.getNotification(criteria,{},{lean: true},function(err,data){
                if(err)
                    cb(Configuration.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR);
                else{
                    if(data && data[0]) cb();
                    else {
                        exist = false;
                        cb();
                    }
                }
            })
        },
        function(cb){
            if(exist){
                var criteria = {
                    user: ObjectId(userId)
                };
                var dataToSet = {
                    $push: {
                        notificationData: {
                            flag: payload.flag,
                            message: payload.message,
                            payload: payload
                        }
                    }
                };
                Service.NotificationService.updateNotification(criteria,dataToSet, {new: true},function(err,data){
                    if(err)
                        console.log('err',err);
                    cb();
                });
            }else{
                var dataToSet = {
                    user: ObjectId(userId)
                };
                Service.NotificationService.createNotification(dataToSet, function(err,data){
                    if(err) {
                        console.log('err', err);
                        cb();
                    }
                    else{
                        var criteria = {
                            _id: data._id
                        };
                        var dataToSet = {
                            $push: {
                                notificationData: {
                                    flag: payload.flag,
                                    message: payload.message,
                                    payload: payload
                                }
                            }
                        };
                        Service.NotificationService.updateNotification(criteria,dataToSet, {new: true},function(err,data){
                            if(err)
                                console.log('err',err);
                            cb();
                        });
                    }
                });
            }
        }
    ],function(err,data){console.log(err);})

};

function sendFCMPush(registrationIds, push_arr_info, type, send_message, badge, mute,flag, callback) {
    var FCM = require('fcm-node');
    var fcm = new FCM(config.get("fcmPushKey"));
    console.log('sending push');
    if(type == 4){
        var title = push_arr_info['name'];
    }else{
        var title = 'Socket_Chat' ;
    }
    if(mute ==1){
        var notify_arr ={
            title: title,
            body: send_message ,
            sound: 'default',
            badge: badge,
            type: type,
            flag: flag
        }
    }else{
        var notify_arr ={
            title: title,
            body: send_message ,
            badge: badge,
            type: type,
            flag: flag
        }
    }
    console.log('registrationIds',registrationIds);
    var message = {
        to: registrationIds,
        notification: notify_arr,
        data: push_arr_info
    };

    fcm.send(message, function(err, response){
        if (err) {
            console.log(err)
            return callback(0);
        } else {
            console.log(response)
            return callback(response);
        }
    });
};

module.exports = {
    sendPushNotificationMessage: sendPushNotificationMessage
};