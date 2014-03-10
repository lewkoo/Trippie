'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Lodging = mongoose.model('Lodging'),
    Destination = mongoose.model('Destination'),
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

    var url = req.originalUrl;
    var urlArray = url.split('/');
    var destinationId = urlArray[urlArray.length-2];

    lodging.save(function(err) {
        if (err) {
            console.log(err);
            return res.send('users/signup', {
                errors: err.errors,
                lodging: lodging
            });
        } else {
            Destination.findOne({_id: destinationId}, function(err, destination){
                if (err) { console.log(err); }
                destination.lodgingIDs.push(lodging._id);
                destination.save(function(err) {
                    if (err) { console.log(err); }
                });
            });
            res.jsonp(lodging);
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
    Lodging.find().sort('-created').populate('user', 'name username').exec(function(err, lodgings) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(lodgings);
        }
    });
};