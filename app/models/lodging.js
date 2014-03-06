'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Lodging Schema
 */
var LodgingSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    arrivalDate: {
        type: Date
    },
    departureDate: {
        type: Date
    },
    information: {
        type: String
    },
    destinationID: {
        type: Schema.ObjectId,
        ref: 'Destination'
    }
});

/**
 * Validations
 */
LodgingSchema.path('name').validate(function(name) {
    return name.length;
}, 'Lodging name cannot be blank');

LodgingSchema.path('address').validate(function(address) {
    return address.length;
}, 'Lodging address cannot be blank');

// Validating this way makes sure destination wasn't forgotten to be set instead of
// just testing if it was set as null
LodgingSchema.pre('save', function(next) {
    var error;

    if (!this.destinationID) {
        error = new Error('Saving Lodging without Destination');
    }

    next(error);
});

/**
 * Statics
 */
LodgingSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Lodging', LodgingSchema);
