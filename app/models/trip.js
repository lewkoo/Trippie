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
        type: Date,
        default: Date.now
    }
});

/**
 * Validations
 */
TripSchema.path('name').validate(function(name) {
    return name.length;
}, 'Trip name cannot be blank');

TripSchema.path('user').validate(function(user) {
    return user;
}, 'Trip must be created by a user');

TripSchema.path('tripStartDate').validate(function(tripStartDate) {
    return tripStartDate;
}, 'Trip must be created with a trip start date');

TripSchema.path('tripEndDate').validate(function(tripEndDate) {
    return tripEndDate;
}, 'Trip must be created with a trip end date');

TripSchema.path('tripStartDate').validate(function(tripStartDate) {

    if(tripStartDate > this.tripEndDate)
    {
        return false;
    }else
    {
        return true;
    }

}, 'Trip End Date must be greater or equal to Trip End Date');


/**
 * Statics
 */
TripSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user').exec(cb);
};

mongoose.model('Trip', TripSchema);
