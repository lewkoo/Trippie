'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Destination = mongoose.model('Destination'),
    Event = mongoose.model('Event'),
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
 * Create a destination
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
 * Link to an event
 */

exports.createEvent = function(req, res) {
    var event = new Event(req.body);
    event.save(function(err) {
        if (err) {
            return res.send('trips', {
                errors: err.errors,
                event: event
            });
        } else {
            res.jsonp(event);
        }
    });

    /*var destination = new Destination(req.body);

    destination.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                destination: destination
            });
        } else {
            res.jsonp(destination);
        }
    });*/
    /*console.log(req.body);*/
};


/**
 * Update a destination
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
 * Delete a destination
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
 * Show a destination
 */
exports.show = function(req, res) {
    res.jsonp(req.destination);
};

/**
 * Show a destination
 */
exports.showEvents = function(req, res) {
    res.jsonp(req.destination);
};


/**
 * List of destinations
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
