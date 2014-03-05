'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Trip = mongoose.model('Trip'),
    Destination = mongoose.model('Destination'),
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

    var startDest = new Destination({
        name: 'Start Destination'
        //TODO set name to User.homeAddress if not blank
    });

    var initialDest= new Destination({
        name: 'Destination 1'
    });

    var endDest = new Destination({
        name: 'End Destination'
        //TODO set name to User.homeAddress if not blank
    });

    startDest.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            console.log('Created:\n %s', startDest);
        }
    });

    initialDest.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            console.log('Created:\n %s', initialDest);
        }
    });

    endDest.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            console.log('Created:\n %s', endDest);
        }
    });

    trip.destinationList = [startDest._id, initialDest._id, endDest._id];
            
    trip.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            console.log('Created:\n %s', trip);
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
