'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    Destination = mongoose.model('Destination'),
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
    /*if(String(req.trip.user._id) === String(req.user._id)) {
        console.log('reached create');
    }
        Destination.findOne({name: 'stubDestination', tripID: req.trip._id}).exec(function(err, destination)) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                if (!destination) {
                    var event = new Event(req.body);
                    var destination = new Destination({ 
                        name: 'stubDestination',
                        eventIDs: []
                    });
                    destination.save(function(err) {
                        event = 
                    });
                    event = _.extend(event, destination);*/
    var event = new Event(req.body);
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
/*
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
};
*/
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

    if(String(req.event._id) === String(req.event._id))//String(req.user._id))
    {
        res.jsonp(req.event);
    }else{
        res.redirect('/');
    }

};

/**
 * Show List
 */
exports.showList = function(req, res) {
    console.log('logging: '+req.body);
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
    }
};

/**
 * List
 */
exports.all = function(req, res) {
    Event.find({}).exec(function(err, events) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(events);
        }
    });
};
