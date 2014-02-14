'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Trip Schema
 */
var TripSchema = new Schema({
    name: {
		type: String,
		trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    initialDestinationID: {
        type: Schema.ObjectId,
        ref: 'Destination'
    },
    tripStartDate: {
        type: Date,
        default: Date.now
    },
    tripEndDate: {
        type: Date
    }
});

/**
 * Validations
 */
TripSchema.path('name').validate(function(name) {
    return name.length;
}, 'Trip name cannot be blank');

mongoose.model('Trip', TripSchema);
