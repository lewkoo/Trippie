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
        ref: 'Transporation'
    },
    incomingTransportationID: {
        type: Schema.ObjectId,
        ref: 'Transportation'
    },
    eventIDs: [Schema.Types.ObjectId],
    lodgingIDs: [Schema.Types.ObjectId],
    noteIDs: {
        type: Schema.ObjectId,
        ref: 'Notes'
    },
    tripID: {
        type: Schema.ObjectId,
        ref: 'Trip'
    }
});

/**
 * Validations
 */
DestinationSchema.path('name').validate(function(name) {
    return name.length;
}, 'Destination name cannot be blank');

/**
 * Model
 */
mongoose.model('Destination', DestinationSchema);
