'use strict';

// Lodgings routes use lodgings controller
var lodgings = require('../controllers/lodgings');
var authorization = require('./middlewares/authorization');

// Lodging authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.trip.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/trips/:tripId/destinations/:destinationId/lodgings', lodgings.all);
    app.post('/trips/:tripId/destinations/:destinationId/lodgings', authorization.requiresLogin, lodgings.create);
    app.get('/trips/:tripId/destinations/:destinationId/lodgings/:lodgingId', lodgings.show);
    app.put('/trips/:tripId/destinations/:destinationId/lodgings/:lodgingId', authorization.requiresLogin, hasAuthorization, lodgings.update);
    app.del('/trips/:tripId/destinations/:destinationId/lodgings/:lodgingId', authorization.requiresLogin, hasAuthorization, lodgings.destroy);

    // Finish with setting up the lodgingId param
    app.param('lodgingId', lodgings.lodging);
};