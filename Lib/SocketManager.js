'use strict';
/**
 * Created by Zubin on 14/09/2018.
 */
var Config = require('../Configuration');
var TokenManager = require('./TokenManager');
var Controllers = require('../Controllers');
var Services = require('../Services');
var ObjectId = require('mongodb').ObjectId;
var async = require('async');
var moment = require('moment');
var NotificationManager = require('../Lib/NotificationManager');

exports.connectSocket = function (server) {
    if (!server.app) {
        server.app = {}
    }
    server.app.socketConnections = {};
    var io = require('socket.io').listen(server.listener);



    io.on('disconnect', function(){
        console.log('socket disconnected')
    });


    /*
          CONNECT SOCKET
    */
    io.on('connection', function(socket){


        /*
           AUTHENTICATE SOCKET USER
       */

        socket.on('auth', function (data) {
            //{
            // token: ""
            // }
            //Update SocketConnections

            console.log(server.app.socketConnections);
            if (data && data.token) {
                TokenManager.decodeToken(data.token, function (err, decodedData) {
                    if (!err && decodedData.id) {
                        if (server.app.socketConnections.hasOwnProperty(decodedData.id)) {
                            server.app.socketConnections[decodedData.id].socketId = socket.id;
                            socket.emit('messageFromServer', { message:'Added To socketConnections',performAction:'INFO'});
                        } else {
                            server.app.socketConnections[decodedData.id] = {
                                socketId: socket.id
                            };
                            socket.emit('messageFromServer', { message:'Socket id Updated',performAction:'INFO'});
                        }
                    } else {
                        socket.emit('messageFromServer', { message:'Invalid Token',performAction:'INFO'});
                    }
                })
            }else {
                console.log('msgFromClient',data)
            }
        });



        /*
           SEND MESSAGE TEXT MESSAGE
       */
        socket.on('sendMessage', function (messageData)  {
            console.log('check message data >>>>>>>>  ',messageData);
            // {
            //     sender: "",
            //     userId: "",
            //     message: "",
            //     booking: ""
            // }
            saveMesssage(messageData, function (error, response) {
                console.log('saving message data >>>>',error,response);
                if (error) {
                        console.log(error);
                }else {
                    var to = null;
                    var connectObj = server.app.socketConnections[messageData.userId];
                    console.log('connectObject    ',connectObj);
                    if (connectObj){
                        to = connectObj.socketId;
                    }else{
                        socket.emit('messageFromServer', { message:'Receiver is offline',performAction:'INFO'});
                    }
                    var from = server.app.socketConnections[messageData.sender].socketId;


                    console.log("Linstener is  receivedMessage");
                    console.log("Send --- to >>>>>  ",to );
                    console.log("Message is  >>>>>>  ",messageData );
                    NotificationManager.sendPushNotificationMessage(messageData.userId,Config.APP_CONSTANTS.pushNotificationMessages.NEW_MESSAGE,{},null,null,null,response);

                    if (to) {
                        socket.to(to).emit("newMessage", {
                            sender: messageData.sender,
                            message: messageData.message,
                            booking: response.booking,
                            performAction : 'INFO'
                        });
                    }

                    if (from) {
                        //Acknowledge message sent.
                        socket.to(from).emit("messageSent", {
                            message: messageData.message,
                            performAction : 'INFO'
                        });
                    }else {
                        socket.emit('messageFromServer', { message:'Not able to send message.', performAction:'INFO'});
                    }
                }

            });

        });



        /*
           CHECK USER ONLINE
       */
        socket.on('checkOnline', function (data) {
            console.log('check online',server.app.socketConnections,data);
            if (data && data.userId) {
                        if (server.app.socketConnections.hasOwnProperty(data.userId)) {
                            console.log('is online',socket.id);
                            socket.to(socket.id).emit("isOnline", {
                                isOnline: true,
                                performAction : 'INFO'
                            });
                        } else {
                            console.log('is offline',socket.id);
                            socket.to(socket.id).emit("isOnline", {
                                isOnline: false,
                                performAction : 'INFO'
                            });
                        }
                    }
                });


        /*
            DISCONNECT SOCKET
        */
        socket.on('disconnectSock', function (data) {
            console.log('disconnect socket', data);
            console.log('server.app.socketConnections',server.app.socketConnections);
            if (data && data.user) {
                if (server.app.socketConnections.hasOwnProperty(data.user)) {
                    delete server.app.socketConnections[data.user];
                    console.log('server.app.socketConnections',server.app.socketConnections);
                } else {}
            }
        });
    });
};

var saveMesssage = function(message, callback){
    var exist = false;
    var id = null;
    var chatId = null;
    async.series([
        function(cb){
                var criteria = {
                    $or: [
                        {
                            user1: ObjectId(message.sender),
                            user2: ObjectId(message.userId)
                        },
                        {
                            user2: ObjectId(message.sender),
                            user1: ObjectId(message.userId)
                        }
                    ]
                };
                Services.ChatService.getChat(criteria,{},{lean: true},function(err,data){
                    if(err)
                        cb(err);
                    else {
                        if(data && data[0]) {
                            id = data[0]._id;
                            console.log('id',id);
                            exist = true;
                        }
                        cb();
                    }
                })
        },
        function(cb){
            if(exist){
                var criteria = {
                    _id: id
                };
                console.log('criteria',criteria);
                var dataToUpdate = {};
                if(message.booking && message.booking != ""){
                    dataToUpdate = {
                        $push: {
                        messages: {
                                sentBy: message.sender,
                                message: {
                                    text: message.message,
                                    booking: ObjectId(message.booking)
                                },
                                createdAt: new Date().toISOString()
                            }
                        }
                    };
                }
                else dataToUpdate = {
                    $push: {
                        messages: {
                            sentBy: message.sender,
                            message: {
                                text: message.message
                            },
                            createdAt: new Date().toISOString()
                        }
                    }
                };
                console.log('updating chat >>>>>>>');
                Services.ChatService.updateChat(criteria,dataToUpdate,{new: true},function(err,data){
                    console.log('updating chat >>>>>>>',err,data);
                    if(err)
                        cb(err);
                    else{
                        console.log('updated chat >>>>>>>');
                        cb();
                    }
                })
            }else{
                var data = {};
                    data.user1 = ObjectId(message.sender);
                    data.user2 = ObjectId(message.userId);
                Services.ChatService.createChat(data,function(err,data){
                    console.log('updatin chat >>>>>>>',err,data);
                    if(err)
                        cb(err);
                    else{
                        var criteria  = {
                            _id: data._id
                        };
                        var dataToUpdate = {};
                        if(message.booking && message.booking != ""){
                            dataToUpdate = {
                                $push: {
                                    messages: {
                                        sentBy: message.sender,
                                        message: {
                                            text: message.message,
                                            booking: message.booking
                                        },
                                        createdAt: new Date().toISOString()
                                    }
                                }
                            };
                        }

                        else dataToUpdate = {
                            $push: {
                                messages: {
                                    sentBy: message.sender,
                                    message: {
                                        text: message.message
                                    },
                                    createdAt: new Date().toISOString()
                                }
                            }
                        };
                        Services.ChatService.updateChat(criteria,dataToUpdate,{new: true},function(err,cdata){
                            console.log('updating chat >>>>>>>',err,data);
                            if(err)
                                cb(err);
                            else {
                                chatId = cdata._id;
                                cb();
                            }
                        });
                    }
                })
            }
        }
    ],function(err,data){callback(err,{chatId: chatId});})
};
