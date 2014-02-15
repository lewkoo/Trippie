'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Destination = mongoose.model('Destination'),
    _ = require('lodash');
  
/**
 * Find by id
 */
exports.destination = function(req, res, next, id) {
    Destination.load(id, function(err, destination) {
        if (err) return next(err);
        if (!destination) return next(new Error('Failed to load destination ' + id));
        req.destination = destination;
        next();
    });
};
    
/**
 * Create
 */
exports.create = function(req, res) {
    var destination = new Destination(req.body);

    destination.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                destination: destination
            });
        } else {
            res.jsonp(destination);
        }
    });
};

/**
 * Update
 */
exports.update = function(req, res) {
    var destination = req.destination;

    destination = _.extend(destination, req.body);

    destination.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                destination: destination
            });
        } else {
            res.jsonp(destination);
        }
    });
};

/**
 * Delete
 */
exports.destroy = function(req, res) {
    var destination = req.destination;

    destination.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                destination: destination
            });
        } else {
            res.jsonp(destination);
        }
    });
};


/**
 * Show
 */
exports.show = function(req, res) {
    res.jsonp(req.destination);
};

/**
 * List
 */
exports.all = function(req, res) {
    Destination.find().sort('-created').exec(function(err, destinations) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(destinations);
        }
    });
};
