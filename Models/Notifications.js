var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamp = require('mongoose-timestamp');
var Configuration = require('../Configuration');


var NotificationData = new Schema({
    flag: {type: String, default: 0},
    message: {type: String, default: null},
    payload: {type: Object, default: {}},
    isRead: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false}
});

NotificationData.plugin(timestamp);

var Notifications = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    notificationData: {type: [NotificationData], default: []}
});

Notifications.plugin(timestamp);

module.exports = mongoose.model('Notifications', Notifications);