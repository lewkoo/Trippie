'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Notes Schema
 */
var NotesSchema = new Schema({
    name: {
        type: String,
        trim: true
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
NotesSchema.path('name').validate(function(name) {
    return name.length;
}, 'Notes name cannot be blank');

// Validating this way makes sure destination wasn't forgotten to be set instead of
// just testing if it was set as null
NotesSchema.pre('save', function(next) {
    var error;

    if (!this.destinationID) {
        error = new Error('Saving Notes without Destination');
    }

    next(error);
});

/**
 * Statics
 */
NotesSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Notes', NotesSchema);
