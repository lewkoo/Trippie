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
    }
});

/**
 * Validations
 */
TransportationSchema.path('departureTime').validate(function(departureTime) {
    return departureTime;
}, 'Transportation departure time cannot be blank');

// Validating this way makes sure trip wasn't forgotton to be set instead of
// just testing if it was set as null
TransportationSchema.pre('save', function(next) {
    var error;

    if (!this.trip) {
        error = new Error('Saving Transportation without Trip');
    }/* else if (!this.departureTime) {
        error = new Error('Saving Transportation without Departure Time');
    }*/

    next(error);
});

/**
 * Model
 */
mongoose.model('Transportation', TransportationSchema);
