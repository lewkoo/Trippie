'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Event Schema
 */
var EventSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    information: {
        type: String
    },
    eventStartDate: {
        type: Date,
        default: Date.now()
    },
    eventEndDate: {
        type: Date,
        default: Date.now()
    },
    destinationID: {
        type: Schema.ObjectId,
        ref: 'Destination'
    }
});

/**
 * Validations
 */
EventSchema.path('name').validate(function(name) {
    return name.length;
}, 'Event name cannot be blank');

EventSchema.path('eventStartDate').validate(function(eventStartDate) {
    return eventStartDate;
}, 'Event must be created with an event start date');

EventSchema.path('eventEndDate').validate(function(eventEndDate) {
    return eventEndDate;
}, 'Event must be created with an event end date');

EventSchema.path('destinationID').validate(function(destinationID) {
    return destinationID;
}, 'Event must be created with a reference to a destination');

EventSchema.path('eventStartDate').validate(function(eventStartDate) {
    if(eventStartDate > this.eventEndDate)
    {
        return false;
    }else
    {
        return true;
    }
}, 'Event End Date must be greater or equal to Event End Date');

/**
 * Statics
 */
EventSchema.statics.load = function(id, cb) {
    this.findOne({  _id: id   }).populate('destinationID').exec(cb);
};

/**
 * Event Model
 */
mongoose.model('Event', EventSchema);
