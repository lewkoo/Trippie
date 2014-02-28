'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Trip = mongoose.model('Trip'),
    Destination = mongoose.model('Destination'),
    Event = mongoose.model('Event'),
    _ = require('lodash');
  
/**
 * Find trip by id
 */
exports.trip = function(req, res, next, id) {
    Trip.load(id, function(err, trip) {
        if (err) return next(err);
        if (!trip) return next(new Error('Failed to load trip ' + id));
        req.trip = trip;
        next();
    });
};
    
/**
 * Create a trip
 */
exports.create = function(req, res) {
    var trip = new Trip(req.body);
    trip.user = req.user;

    trip.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            res.jsonp(trip);
        }
    });
};

/**
 * Update a trip
 */
exports.update = function(req, res) {
    var trip = req.trip;

    trip = _.extend(trip, req.body);

    trip.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            res.jsonp(trip);
        }
    });
};

/**
 * Delete a trip
 */
exports.destroy = function(req, res) {
    var trip = req.trip;

    trip.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            res.jsonp(trip);
        }
    });
};


/**
 * Show a trip
 */
exports.show = function(req, res) {

    if(String(req.trip.user._id) === String(req.user._id))
    {
        res.jsonp(req.trip);
    }else{
        res.redirect('/');
    }
};

/**
 * List of Trips
 */
exports.all = function(req, res) {
    Trip.find( { user: req.user} ).sort('-created').exec(function(err, trips) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(trips);
        }
    });
};

exports.emptyList = function(req, res) {
    if (req.user._id === req.user._id) {
        res.jsonp([]);
    }
};

/**
 *  Show List of Events
 *   */
exports.showEventList = function(req, res) {
    var destination;
    var event;
    var testAddress = '201 Main St, Winnipeg, MB';
    var testInfo = 'My workplace; do not be late';
    var testDate = new Date();
    var testEventName = 'Test event';
    destination = new Destination({
        name: 'Test destination',
        eventIDs: []
    });
    event = new Event({
        name: testEventName,
        address: testAddress,
        information: testInfo,
        eventStartDate: testDate,
        eventEndDate: testDate,
        destinationID: destination
    });
    if (req.user._id === req.user._id) {
        res.jsonp(event);
    }
 /* console.log('logging: '+req.body);
    if(String(req.trip.user._id) === String(req.user._id))
    {
        console.log('reached showList');
        Destination.findOne({name: 'stubDestination', tripID: req.trip._id}).exec(function(err, destination) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(destination.eventIDs);
            }
        });
    } else {
        res.redirect('/');
        console.log('showList redirect');
    }*/
};
