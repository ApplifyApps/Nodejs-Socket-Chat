'use strict';

var SERVER = {
    APP_NAME: 'Real Time Socket Chat',
    PORTS: {
        HAPI: 3000
    },
    TOKEN_EXPIRATION_IN_MINUTES: 600,
    JWT_SECRET_KEY: 'sUPerSeCuREKeY&^$^&$^%$^%7782348723t4872t34Ends',
    GOOGLE_API_KEY : '',
    THUMB_WIDTH : 50,
    THUMB_HEIGHT : 50,
    DOMAIN_NAME : '',
    IP : '',
    STRIPE_KEY: ""
};

var DATABASE = {
    PROFILE_PIC_PREFIX : {
        ORIGINAL : 'profilePic_',
        THUMB : 'profileThumb_'
    },
    USER_ROLES: {
        ADMIN: 'ADMIN',
        USER: 'USER'
    },
    FILE_TYPES: {
        LOGO: 'LOGO'
    },
    DEVICE_TYPES: {
        IOS: 'IOS',
        ANDROID: 'ANDROID',
        WEB: 'WEB'
    },
    ADMIN_TYPE: {
        SUPER_ADMIN: 0,
        SUB_ADMIN: 1,
        STAFF: 2
    },
    GENDER: {
        MALE: 'MALE',
        FEMALE: 'FEMALE'
    }
};

var STATUS_MSG = {
    ERROR: {
        INVALID_USER_PASS: {
            statusCode:401,
            type: 'INVALID_USER_PASS',
            customMessage : 'Invalid username or password'
        },
        TOKEN_ALREADY_EXPIRED: {
            statusCode:401,
            customMessage : 'Token Already Expired',
            type : 'TOKEN_ALREADY_EXPIRED'
        },
        DB_ERROR: {
            statusCode:400,
            customMessage : 'DB Error : ',
            type : 'DB_ERROR'
        },
        INVALID_ID: {
            statusCode:400,
            customMessage : 'Invalid Id Provided : ',
            type : 'INVALID_ID'
        },
        APP_ERROR: {
            statusCode:400,
            customMessage : 'Application Error',
            type : 'APP_ERROR'
        },
        NOT_FOUND: {
            statusCode:400,
            customMessage : 'User not found',
            type : 'NOT_FOUND'
        },
        USER_EMAIL_NOT_FOUND: {
            statusCode:400,
            customMessage : 'User with this email not found',
            type : 'USER_EMAIL_NOT_FOUND'
        },
        IMP_ERROR: {
            statusCode:500,
            customMessage : 'Implementation Error',
            type : 'IMP_ERROR'
        },
        APP_VERSION_ERROR: {
            statusCode:400,
            customMessage : 'One of the latest version or updated version value must be present',
            type : 'APP_VERSION_ERROR'
        },
        INVALID_TOKEN: {
            statusCode:401,
            customMessage : 'Invalid token provided',
            type : 'INVALID_TOKEN'
        },
        INVALID_CODE: {
            statusCode:400,
            customMessage : 'Invalid Verification Code',
            type : 'INVALID_CODE'
        },
        DEFAULT: {
            statusCode:400,
            customMessage : 'Error',
            type : 'DEFAULT'
        },
        PHONE_NO_EXIST: {
            statusCode:400,
            customMessage : 'Phone No Already Exist',
            type : 'PHONE_NO_EXIST'
        },
        EMAIL_EXIST: {
            statusCode:400,
            customMessage : 'Email Already Exist',
            type : 'EMAIL_EXIST'
        },
        ADMIN_EXISTS: {
            statusCode:400,
            customMessage : 'Admin Already Exists',
            type : 'ADMIN_EXISTS'
        },
        DUPLICATE: {
            statusCode:400,
            customMessage : 'Duplicate Entry',
            type : 'DUPLICATE'
        },
        DUPLICATE_ADDRESS: {
            statusCode:400,
            customMessage : 'Address Already Exist',
            type : 'DUPLICATE_ADDRESS'
        },
        UNIQUE_CODE_LIMIT_REACHED: {
            statusCode:400,
            customMessage : 'Cannot Generate Unique Code, All combinations are used',
            type : 'UNIQUE_CODE_LIMIT_REACHED'
        },
        INVALID_EMAIL: {
            statusCode:400,
            customMessage : 'Invalid Email Address',
            type : 'INVALID_EMAIL'
        },
        PASSWORD_REQUIRED: {
            statusCode:400,
            customMessage : 'Password is required',
            type : 'PASSWORD_REQUIRED'
        },
        INVALID_COUNTRY_CODE: {
            statusCode:400,
            customMessage : 'Invalid Country Code, Should be in the format +52',
            type : 'INVALID_COUNTRY_CODE'
        },
        INVALID_PHONE_NO_FORMAT: {
            statusCode:400,
            customMessage : 'Phone no. cannot start with 0',
            type : 'INVALID_PHONE_NO_FORMAT'
        },
        COUNTRY_CODE_MISSING: {
            statusCode:400,
            customMessage : 'You forgot to enter the country code',
            type : 'COUNTRY_CODE_MISSING'
        },
        INVALID_PHONE_NO: {
            statusCode:400,
            customMessage : 'Phone No. & Country Code does not match to which the OTP was sent',
            type : 'INVALID_PHONE_NO'
        },
        PHONE_NO_MISSING: {
            statusCode:400,
            customMessage : 'You forgot to enter the phone no.',
            type : 'PHONE_NO_MISSING'
        },
        NOTHING_TO_UPDATE: {
            statusCode:400,
            customMessage : 'Nothing to update',
            type : 'NOTHING_TO_UPDATE'
        },
        USER_NOT_FOUND: {
            statusCode:400,
            customMessage : 'User Not Found',
            type : 'USER_NOT_FOUND'
        },
        INVALID_RESET_PASSWORD_TOKEN: {
            statusCode:400,
            customMessage : 'Invalid Reset Password Token',
            type : 'INVALID_RESET_PASSWORD_TOKEN'
        },
        INCORRECT_PASSWORD: {
            statusCode:401,
            customMessage : 'Incorrect Password',
            type : 'INCORRECT_PASSWORD'
        },
        EMPTY_VALUE: {
            statusCode:400,
            customMessage : 'Empty String Not Allowed',
            type : 'EMPTY_VALUE'
        },
        PHONE_NOT_MATCH: {
            statusCode:400,
            customMessage : "Phone No. Doesn't Match",
            type : 'PHONE_NOT_MATCH'
        },
        SAME_PASSWORD: {
            statusCode:400,
            customMessage : 'Old password and new password are same',
            type : 'SAME_PASSWORD'
        },
        ACTIVE_PREVIOUS_SESSIONS: {
            statusCode:400,
            customMessage : 'You already have previous active sessions, confirm for flush',
            type : 'ACTIVE_PREVIOUS_SESSIONS'
        },
        ERROR_PROFILE_PIC_UPLOAD: {
            statusCode:400,
            customMessage : 'Profile pic is not a valid file',
            type : 'ERROR_PROFILE_PIC_UPLOAD'
        },
        EMAIL_NOT_FOUND: {
            statusCode:400,
            customMessage : 'This email address is not registered with us. Please register to continue.',
            type : 'EMAIL_NOT_FOUND'
        },
        EMAIL_NOT_VERIFIED: {
            statusCode:400,
            customMessage : 'Please verify your email first',
            type : 'EMAIL_NOT_VERIFIED'
        },
        USER_BLOCKED: {
            statusCode:400,
            customMessage : 'There is some problem with your account. Please contact our customer care',
            type : 'USER_BLOCKED'
        },
        PHONE_NOT_FOUND: {
            statusCode:400,
            customMessage : 'Phone No. Not Found',
            type : 'PHONE_NOT_FOUND'
        },
        INCORRECT_OLD_PASS: {
            statusCode:400,
            customMessage : 'Incorrect Old Password',
            type : 'INCORRECT_OLD_PASS'
        },
        UNAUTHORIZED: {
            statusCode:401,
            customMessage : 'You are not authorized to perform this action',
            type : 'UNAUTHORIZED'
        }
    },
    SUCCESS: {
        CREATED: {
            statusCode:201,
            customMessage : 'Created Successfully',
            type : 'CREATED'
        },
        DEFAULT: {
            statusCode:200,
            customMessage : 'Success',
            type : 'DEFAULT'
        },
        UPDATED: {
            statusCode:200,
            customMessage : 'Updated Successfully',
            type : 'UPDATED'
        },
        PASSWORD_UPDATED: {
            statusCode:200,
            customMessage : 'Password Updated Successfully',
            type : 'PASSWORD_UPDATED'
        },
        PROFILE_UPDATED: {
            statusCode:200,
            customMessage : 'Profile Updated Successfully',
            type : 'PROFILE_UPDATED'
        },
        LOGOUT: {
            statusCode:200,
            customMessage : 'Logged Out Successfully',
            type : 'LOGOUT'
        },
        DELETED: {
            statusCode:200,
            customMessage : 'Deleted Successfully',
            type : 'DELETED'
        }
    }
};


var swaggerDefaultResponseMessages = [
    {code: 200, message: 'OK'},
    {code: 400, message: 'Bad Request'},
    {code: 401, message: 'Unauthorized'},
    {code: 404, message: 'Data Not Found'},
    {code: 500, message: 'Internal Server Error'}
];


var notificationMessages = {};

var pushNotificationMessages = {
    NEW_MESSAGE: {
        message: 'You have a new message.',
        flag: 100
    }
};


var APP_CONSTANTS = {
    SERVER: SERVER,
    DATABASE: DATABASE,
    STATUS_MSG: STATUS_MSG,
    notificationMessages: notificationMessages,
    pushNotificationMessages: pushNotificationMessages,
    swaggerDefaultResponseMessages: swaggerDefaultResponseMessages
};

module.exports = APP_CONSTANTS;