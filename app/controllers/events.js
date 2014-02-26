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
 * List
 */
exports.all = function(req, res) {
    Event.find().exec(function(err, events) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(events);
        }
    });
};
