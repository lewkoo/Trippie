'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Transportation Schema
 */

var transportTypesEnum = {
    values: 'plane train bus car'.split(' '),
    message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
};
var TransportationSchema = new Schema({
    type: {
        type: String,
        enum: transportTypesEnum,
        trim: true
    },
    information: {
        type: String,
        trim: true
    },
    departureTime: {
        type: Date,
        default: Date.now
    },
    destinationStartID: {
        type: Schema.ObjectId,
        ref: 'Destination'
    },
    destinationEndID: {
        type: Schema.ObjectId,
        ref: 'Destination'
    }
});

/**
 * Validations
 */
TransportationSchema.path('departureTime').validate(function(departureTime) {
    return departureTime;
}, 'Transportation departure time cannot be blank');
/*
TransportationSchema.path('user').validate(function(user) {
    return user;
}, 'Transportation must be created by a user');
*/
TransportationSchema.path('destinationStartID').validate(function(destinationStartID) {
    return destinationStartID;
}, 'Transportation must be created with a start destination');

TransportationSchema.path('destinationEndID').validate(function(destinationEndID) {
    return destinationEndID;
}, 'Transportation must be created with an end destination');

/**
 * Statics
 */
TransportationSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    })/*.populate('user')*/.exec(cb);
};

mongoose.model('Transportation', TransportationSchema);
