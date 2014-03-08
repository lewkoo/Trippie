'use strict';

// Transportations routes use transportations controller
var transportations = require('../controllers/transportations');
var authorization = require('./middlewares/authorization');

// Transportation authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.trip.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.post('/trips/:tripId/destinations/:destinationId/transportations', authorization.requiresLogin, transportations.create);
    app.get('/trips/:tripId/destinations/:destinationId/transportations/:transportationId', transportations.show);
    app.put('/trips/:tripId/destinations/:destinationId/transportations/:transportationId', authorization.requiresLogin, hasAuthorization, transportations.update);
    app.del('/trips/:tripId/destinations/:destinationId/transportations/:transportationId', authorization.requiresLogin, hasAuthorization, transportations.destroy);

    // Finish with setting up the transportationId param
    app.param('transportationId', transportations.transportation);
};
