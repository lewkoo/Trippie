'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Transportation = mongoose.model('Transportation'),
    _ = require('lodash');

/**
 * Find by id
 */
exports.transportation = function(req, res, next, id) {
    Transportation.load(id, function(err, transportation) {
        if (err) return next(err);
        if (!transportation) return next(new Error('Failed to load transportation ' + id));
        req.transportation = transportation;
        next();
    });
};

/**
 * Create a transportation
 */
exports.create = function(req, res) {
    var transportation = new Transportation(req.body);

    transportation.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                transportation: transportation
            });
        } else {
            res.jsonp(transportation);
        }
    });
};

/**
 * Update a transportation
 */
exports.update = function(req, res) {
    var transportation = req.transportation;

    transportation = _.extend(transportation, req.body);

    transportation.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                transportation: transportation
            });
        } else {
            res.jsonp(transportation);
        }
    });
};

/**
 * Delete a transportation
 */
exports.destroy = function(req, res) {
    var transportation = req.transportation;

    transportation.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                transportation: transportation
            });
        } else {
            res.jsonp(transportation);
        }
    });
};


/**
 * Show a transportation
 */
exports.show = function(req, res) {
    res.jsonp(req.transportation);
};

/**
 * List of transportations
 */
exports.all = function(req, res) {
    Transportation.find().sort('-departureTime').exec(function(err, transportations) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(transportations);
        }
    });
};
