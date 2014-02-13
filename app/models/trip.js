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
    emailAccess: {
			type: [String],
			default: '',
			trim: true
    	},
    initialDestinationID: Schema.Types.ObjectId
		});

/**
 * Validations
 */
TripSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

mongoose.model('Trip', TripSchema);
