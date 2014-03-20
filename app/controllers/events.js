'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    _ = require('lodash');
  
/**
 * Find by id
 */
exports.event = function(req, res, next, id) {
    Event.load(id, function(err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load event ' + id));
        req.event = event;
        next();
    });
};
    
/**
 * Create
 */
exports.create = function(req, res) {
    var event = new Event(req.body);
    event.destinationID = req.destination._id;

    event.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                event: event
            });
        } else {
            req.destination.eventIDs.push(event._id);
            req.destination.save(function (err) {
                if (err) {
                    return res.send('users/signup', {
                        errors: err.errors
                    });
                }
                res.jsonp(event);
            });
        }
    });
};

/**
 * Update
 */
exports.update = function(req, res) {
    var event = req.event;

    event = _.extend(event, req.body);

    event.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                event: event
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Delete
 */
exports.destroy = function(req, res) {
    var event = req.event;

    event.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                event: event
            });
        } else {
            res.jsonp(event);
        }
    });
};


/**
 * Show
 */
exports.show = function(req, res) {
    res.jsonp(req.event);
};

/**
 * List
 */
exports.all = function(req, res) {
    Event.find({ destinationID: req.destination._id }).exec(function(err, events) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(events);
        }
    });
};
