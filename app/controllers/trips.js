'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Trip = mongoose.model('Trip'),
    Destination = mongoose.model('Destination'),
    Transportation = mongoose.model('Transportation'),
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
    // Trip Object
    var trip = new Trip(req.body);
    trip.user = req.user;


    var name = req.user.homeAddress ? req.user.homeAddress : '';
    
    // Destination Objects
    var startDest = new Destination({
        name: (name.length <= 0 ? 'Start Destination' : name)
    });

    var initialDest = new Destination({
        name: 'Destination 1',
        //TODO set name to User.homeAddress if not blank
    });

    var endDest = new Destination({
        name: (name.length <= 0 ? 'End Destination' : name)
    });

    // Transportation Objects
    var startDestTransportation = new Transportation({
        transportationType: 'other',
        information: 'Transportation placeholder',
        departureTime: Date.now()
    });

    var initialDestTransportation = new Transportation({
        transportationType: 'other',
        information: 'Transportation placeholder',
        departureTime: Date.now()
    });

    // Destination Save Functions
    var startDestSaveFxn, initialDestSaveFxn, endDestSaveFxn;

    // Transportation Save Functions
    var startDestTransportationSaveFxn, initialDestTransportationSaveFxn;

    // Trip Save Function
    var tripSaveFxn;

    // 1
    startDestTransportationSaveFxn = function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            console.log('Created:\n %s', startDestTransportation);

            startDest.outgoingTransportationID = startDestTransportation;

            startDest.save(startDestSaveFxn);
        }
    };

    // 2
    startDestSaveFxn = function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            console.log('Created:\n %s', startDest);
            trip.destinationList[0] = startDest._id;
            initialDestTransportation.save(initialDestTransportationSaveFxn);
        }
    };

    // 3
    initialDestTransportationSaveFxn = function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            console.log('Created:\n %s', initialDestTransportation);

            initialDest.outgoingTransportationID = initialDestTransportation;

            initialDest.save(initialDestSaveFxn);
        }
    };

    // 4
    initialDestSaveFxn = function(err) {
        if (err) {
            console.log('Debug: error');
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            console.log('Created:\n %s', initialDest);
            trip.destinationList[1] = initialDest._id;

            endDest.save(endDestSaveFxn);
        }
    };

    // 5
    endDestSaveFxn = function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            console.log('Created:\n %s', endDest);
            trip.destinationList[2] = endDest._id;
            trip.save(tripSaveFxn);
        }
    };

    // 6
    tripSaveFxn = function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                trip: trip
            });
        } else {
            console.log('Created:\n %s', trip);
            res.jsonp(trip);
        }
    };

    startDestTransportation.save(startDestTransportationSaveFxn);
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

    var removeTransportation = function(err) {
        if (err) {
            console.log('Error deleting transportation: ' + trip.destinationList[i].outgoingTransportationID +
                'in trip: ' + trip);
        } else {
            console.log('Successfully deleted transportation: ' + trip.destinationList[i].outgoingTransportationID +
                'in trip: ' + trip);
        }
    };

    var removeDestination = function(err) {
        if (err) {
            console.log('Error deleting destination: ' + trip.destinationList[i] + 'in trip: ' + trip);
        } else {
            console.log('Successfully deleted destination: ' + trip.destinationList[i] + 'in trip: ' + trip);
        }
    };

    for (var i=0; i < trip.destinationList.length; i++) {
        trip.destinationList[i].outgoingTransportationID.remove(removeTransportation);

        trip.destinationList[i].remove(removeDestination);
    }

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
    var isApiCall = ((req.url).indexOf('api') > -1);
    Trip.find( { user: req.user} ).sort('-created').exec(function(err, trips) {
        if (err) {
            if (isApiCall) {
                res.status(400);
                res.jsonp('There was a problem retrieving your trips.');
            }
            else {
                res.render('error', {
                    status: 500
                });
            }
        } else {
            res.jsonp(trips);
        }
    });
};
