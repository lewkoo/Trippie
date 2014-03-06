'use strict';

// Destinations routes use destinations controller
var destinations = require('../controllers/destinations');
var authorization = require('./middlewares/authorization');

// Destination authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.trip.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.post('/trips/:tripId', authorization.requiresLogin, destinations.create);
    app.get('/trips/destinations/:destinationId/events', destinations.showEvents);

app.get('/trips/:tripId/:tripID/destinations/:destinationId', destinations.show);
    app.put('/trips/:tripId/:tripID/destinations/:destinationId', authorization.requiresLogin, hasAuthorization, destinations.update);
    app.del('/trips/:tripId/:tripID/destinations/:destinationId', authorization.requiresLogin, hasAuthorization, destinations.destroy);

    // Finish with setting up the destinationId param
    app.param('destinationId', destinations.destination);
};
