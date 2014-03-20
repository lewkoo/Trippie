'use strict';

// Required controllers
var events = require('../controllers/events');
var trips = require('../controllers/trips');
var destinations = require('../controllers/destinations');
var authorization = require('./middlewares/authorization');

// Authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.trip.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {
    app.get('/trips/:tripId/destinations/:destinationId/events', events.all);
    app.post('/trips/:tripId/destinations/:destinationId/events', authorization.requiresLogin, events.create);
    app.get('/trips/:tripId/destinations/:destinationId/events/:eventId', events.show);
    app.put('/trips/:tripId/destinations/:destinationId/events/:eventId', authorization.requiresLogin, hasAuthorization, events.update);
    app.del('/trips/:tripId/destinations/:destinationId/events/:eventId', authorization.requiresLogin, hasAuthorization, events.destroy);

    // Finish with setting up the params
    app.param('destinationId', destinations.destination);
    app.param('tripId', trips.trip);
    app.param('eventId', events.event);
};
