'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Lodging = mongoose.model('Lodging'),
    _ = require('lodash');

/**
 * Find lodging by id
 */
exports.lodging = function(req, res, next, id) {
    Lodging.load(id, function(err, lodging) {
        if (err) return next(err);
        if (!lodging) return next(new Error('Failed to load lodging ' + id));
        req.lodging = lodging;
        next();
    });
};

/**
 * Create a lodging
 */
exports.create = function(req, res) {
    var lodging = new Lodging(req.body);
    lodging.user = req.user;
    lodging.destinationID = req.destination._id;

    lodging.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                lodging: lodging
            });
        } else {
            req.destination.lodgingIDs.push(lodging._id);
            req.destination.save(function (err) {
                if (err) {
                    return res.send('users/signup', {
                        errors: err.errors
                    });
                }
                res.jsonp(lodging);
            });
        }
    });
};

/**
 * Update a lodging
 */
exports.update = function(req, res) {
    var lodging = req.lodging;

    lodging = _.extend(lodging, req.body);

    lodging.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                lodging: lodging
            });
        } else {
            res.jsonp(lodging);
        }
    });
};

/**
 * Delete an lodging
 */
exports.destroy = function(req, res) {
    var lodging = req.lodging;

    lodging.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                lodging: lodging
            });
        } else {
            res.jsonp(lodging);
        }
    });
};

/**
 * Show a lodging
 */
exports.show = function(req, res) {
    res.jsonp(req.lodging);
};

/**
 * List of Lodgings
 */
exports.all = function(req, res) {
    Lodging.find({ destinationID: req.destination._id }).sort('-created').exec(function(err, notes) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(notes);
        }
    });
};