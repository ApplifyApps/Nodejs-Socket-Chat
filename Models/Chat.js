var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamp = require('mongoose-timestamp');

var Configuration = require('../Configuration');


var Messages = new Schema({
    sentBy: {type: Schema.Types.ObjectId, ref: 'User'},
    isDeleted: {type: Boolean, default: false},
    isRead: {type: Boolean, default: false},
    message: {
        text: {type: String, default: null},
        booking: {type: String,default: null}
    },
    createdAt: {type: Date,required: true, index: true}
});

var Chat = new Schema({
    user1: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    user2: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    isDeleted: {type: Boolean, default: false},
    messages: {type: [Messages], default: []}
});

Chat.plugin(timestamp);

module.exports = mongoose.model('Chat', Chat);