'use strict';

// Trips routes use trips controller
var trips = require('../controllers/trips');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/trips', trips.all);
    app.post('/trips', authorization.requiresLogin, trips.create);
    app.get('/trips/:tripId', trips.show);
    app.put('/trips/:tripId', authorization.requiresLogin, trips.update);
    app.del('/trips/:tripId', authorization.requiresLogin, trips.destroy);

		// Finish with setting up the tripId param
    app.param('tripId', trips.trip);
};
