'use strict';

// Trips routes use trips controller
var trips = require('../controllers/trips');
var authorization = require('./middlewares/authorization');

// Trip authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.trip.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app, passport) {

    app.get('/trips', trips.all);
    app.post('/trips', authorization.requiresLogin, trips.create);
    app.get('/trips/:tripId', trips.show);
    app.put('/trips/:tripId', authorization.requiresLogin, hasAuthorization, trips.update);
    app.del('/trips/:tripId', authorization.requiresLogin, hasAuthorization, trips.destroy);

    // Finish with setting up the tripId param
    app.param('tripId', trips.trip);

    // ** REST CALLS **
    app.get('/api/trips', passport.authenticate('basic', { session: false }), trips.all);
    app.post('/api/trips', passport.authenticate('basic', { session: false }), trips.create);
};
