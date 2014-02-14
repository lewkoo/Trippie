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
    initialDestinationID: Schema.Types.ObjectId
});

// var UserSchema = new Schema({
//     email: {
//         type: String,
//         unique: true
//     },
//     homeAddress: String,
//     hashed_password: String,
//     provider: String,
//     salt: String,
//     tripIDs: [Schema.Types.ObjectId]
// });

/**
 * Validations
 */
TripSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

mongoose.model('Trip', TripSchema);
