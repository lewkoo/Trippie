'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Enum
 */
var transportTypesEnum = {
    values: 'plane train bus car other'.split(' '),
    message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
};

/**
 * Schema
 */
var TransportationSchema = new Schema({
    transportType: {
        type: String,
        enum: transportTypesEnum,
        trim: true
    },
    information: {
        type: String,
        trim: true
    },
    departureTime: {
        type: Date
    },
    arrivalTime: {
        type: Date
    }
});

/**
 * Statics
 */
TransportationSchema.statics.load = function(id, cb) {
    this.findOne({  _id: id   }).exec(cb);
};

/**
 * Validations
 */
TransportationSchema.path('departureTime').validate(function(departureTime) {
    return departureTime;
}, 'Transportation departure time cannot be blank');

/**
 * Model
 */
mongoose.model('Transportation', TransportationSchema);
