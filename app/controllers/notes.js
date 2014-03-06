'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Notes = mongoose.model('Notes'),
    _ = require('lodash');

/**
 * Find notes by id
 */
exports.notes = function(req, res, next, id) {
    Notes.load(id, function(err, notes) {
        if (err) return next(err);
        if (!notes) return next(new Error('Failed to load notes ' + id));
        req.notes = notes;
        next();
    });
};

/**
 * Create a notes
 */
exports.create = function(req, res) {
    var notes = new Notes(req.body);
    notes.user = req.user;

    notes.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                notes: notes
            });
        } else {
            res.jsonp(notes);
        }
    });
};

/**
 * Update a notes
 */
exports.update = function(req, res) {
    var notes = req.notes;

    notes = _.extend(notes, req.body);

    notes.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                notes: notes
            });
        } else {
            res.jsonp(notes);
        }
    });
};

/**
 * Delete an notes
 */
exports.destroy = function(req, res) {
    var notes = req.notes;

    notes.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                notes: notes
            });
        } else {
            res.jsonp(notes);
        }
    });
};

/**
 * Show a notes
 */
exports.show = function(req, res) {
    res.jsonp(req.notes);
};

/**
 * List of Notess
 */
exports.all = function(req, res) {
    Notes.find().sort('-created').populate('user', 'name username').exec(function(err, notess) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(notess);
        }
    });
};