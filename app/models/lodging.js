'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var LodgingSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    address: {
        type: String,
        default: '',
        trim: true
    },
    arrivalDate: {
        type: Date,
        default: Date.now
    },
    departureDate: {
        type: Date,
        default: Date.now
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

LodgingSchema.path('arrivalDate').validate(function(arrivalDate) {
    return arrivalDate.length;
}, 'Lodging arrival date cannot be blank');

mongoose.model('Lodging', LodgingSchema);
