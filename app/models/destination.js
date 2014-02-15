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
    eventIDs: [Schema.Types.ObjectId]
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
