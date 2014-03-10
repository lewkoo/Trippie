'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Notes Schema
 */
var NoteSchema = new Schema({
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
NoteSchema.path('name').validate(function(name) {
    return name.length;
}, 'Notes name cannot be blank');

// Validating this way makes sure destination wasn't forgotten to be set instead of
// just testing if it was set as null
NoteSchema.pre('save', function(next) {
    var error;

    if (!this.destinationID) {
        error = new Error('Saving Note without Destination');
    }

    next(error);
});

/**
 * Statics
 */
NoteSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Note', NoteSchema);
