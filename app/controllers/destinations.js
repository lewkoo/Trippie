'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Destination = mongoose.model('Destination'),
    Transportation = mongoose.model('Transportation'),
    Event = mongoose.model('Event'),
    Note = mongoose.model('Note'),
    Lodging = mongoose.model('Lodging'),
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
            return res.send(err.message, {
                errors: err.errors,
                destination: destination
            });
        } else {
            res.jsonp(destination);
        }
    });
};

/**
 * Update a destination
 */
exports.update = function(req, res) {
    var destination = req.destination;

    destination = _.extend(destination, req.body);
    destination.markModified('noteIDs');
    destination.markModified('lodgingIDs');
    destination.markModified('eventIDs');

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

// callback sent to exports.destination which removes all contained documents from a destination
exports.destroyContainedDocuments = function(destination) {
    var mTransportation, mEvent, mLodging, mNote, j;

    var removeTransportation = function(err) {
        if (err) {
            console.log('Error deleting transportation: (' + destination.outgoingTransportationID._id +
                ') from destination: ' + destination.name + '(' + destination._id + ')');
        }
    };
    
    var removeEvent = function(err) {
        if (err) {
            console.log('Error deleting event: (' + mEvent._id +
                ') from destination: ' + destination.name + '(' + destination._id + ')');
        }
    };

    var removeLodging = function(err) {
        if (err) {
            console.log('Error deleting lodging: (' + mLodging._id +
                ') from destination: ' + destination.name + '(' + destination._id + ')');
        }
    };

    var removeNote = function(err) {
        if (err) {
            console.log('Error deleting note: (' + mNote._id +
                ') from destination: ' + destination.name + '(' + destination._id + ')');
        }
    };

    // remove transportation, if any
    if (destination.outgoingTransportationID) {
        mTransportation = destination.outgoingTransportationID._id ? destination.outgoingTransportationID._id : destination.outgoingTransportationID;
        Transportation.remove({ _id: mTransportation }, removeTransportation);
    }
    // remove events, if any
    for (j=0; j < destination.eventIDs.length; j++) {
        mEvent = destination.eventIDs[j];
        Event.remove({ _id: mEvent._id }, removeEvent);
    }
    // remove lodgings, if any
    for (j=0; j < destination.lodgingIDs.length; j++) {
        mLodging = destination.lodgingIDs[j];
        Lodging.remove({ _id: mLodging._id }, removeLodging);
    }
    // remove notes, if any
    for (j=0; j < destination.noteIDs.length; j++) {
        mNote = destination.noteIDs[j];
        Note.remove({ _id: mNote._id }, removeNote);
    }
};

/**
 * Delete a destination
 */
exports.destroy = function(req, res) {
    var destination = req.destination;

    exports.destroyContainedDocuments(destination);

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
 * List of destinations
 */
exports.all = function(req, res) {
    Destination.find().exec(function(err, destinations) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(destinations);
        }
    });
};
