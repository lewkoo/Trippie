'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Schema
 */
var DestinationSchema = new Schema({
    name: {
		type: String,
		trim: true
    },
    outgoingTransportationID: {
        type: Schema.ObjectId,
        ref: 'Transportation'
    },
    eventIDs: [{
        type: Schema.ObjectId,
        ref: 'Event'
    }],
    lodgingIDs: [{
        type: Schema.ObjectId,
        ref: 'Lodging'
    }],
    noteIDs: [{
        type: Schema.ObjectId,
        ref: 'Note'
    }]
});

/**
 * Validations
 */
DestinationSchema.path('name').validate(function(name) {
    return name.length;
}, 'Destination name cannot be blank');

/**
 * Statics
 */
DestinationSchema.statics.load = function(id, cb) {
    this.findOne({  _id: id   })
        .populate('outgoingTransportationID')
        .populate('eventIDs')
        .populate('lodgingIDs')
        .populate('noteIDs')
        .exec(cb);
};

/**
 * Model
 */
mongoose.model('Destination', DestinationSchema);
