var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Configuration = require('../Configuration');



var Users = new Schema({
    name: {type: String, trim: true, index: true, default: null, sparse: true},
    countryCode: {type: String, trim: true, min:2, max:5},
    phoneNo: {type: String,  trim: true, min: 5, max: 15},
    newNumber: {type: String, trim: true, sparse: true, min: 5, max: 15},
    email: {type: String, trim: true, unique: true, index: true, required: true},
    codeUpdatedAt: {type: Date, default: Date.now, required: true},
    firstTimeLogin: {type: Boolean, default: false},
    password: {type: String},
    passwordResetToken: {type: String, trim: true, unique: true, index: true, sparse: true},
    registrationDate: {type: Date, default: Date.now, required: true},
    appVersion: {type: String},
    accessToken: {type: String, trim: true, index: true, unique: true, sparse: true},
    emailVerificationToken: {type: String, trim: true, index: true, unique: true, sparse: true},
    deviceToken: {type: String, trim: true, index: true, unique: true, sparse: true},
    deviceType: {
        type: String, enum: [
            Configuration.APP_CONSTANTS.DATABASE.DEVICE_TYPES.IOS,
            Configuration.APP_CONSTANTS.DATABASE.DEVICE_TYPES.ANDROID,
            Configuration.APP_CONSTANTS.DATABASE.DEVICE_TYPES.WEB
        ]
    },
    isBlocked: {type: Boolean, default: false, required: true},
    isDeleted: {type: Boolean, default: false, required: true},
    emailVerified: {type: Boolean, default: false, required: true},
    currentLocation: {type: [Number], index: '2d'},
    profilePicURL: {
        original: {type: String, default: null},
        thumbnail: {type: String, default: null}
    }
});

Users.index({'currentLocation.coordinates': "2d"});


module.exports = mongoose.model('Users', Users);
