
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Configuration = require('../Configuration');

var LoginAttempts = new Schema({
    timestamp: {type: Date, default: Date.now},
    validAttempt: {type: Boolean, required: true},
    ipAddress: {type: String, required: true}
});

var Admins = new Schema({
    name: {type: String, trim: true, index: true, default: null, sparse: true},
    email: {type: String, trim: true, unique: true, index: true},
    accessToken: {type: String, trim: true, index: true, unique: true, sparse: true},
    password: {type: String, required:true},
    passwordResetToken: {type: String, trim: true, unique: true, sparse:true},
    registrationDate: {type: Date, default: Date.now, required: true},
    access_type: {type: Number,default: Configuration.APP_CONSTANTS.DATABASE.ADMIN_TYPE.SUPER_ADMIN},
    loginAttempts: [LoginAttempts],
    isActive: {type: Boolean,default: true}
});

module.exports = mongoose.model('Admins', Admins);