'use strict';

// Lodgings routes use notes controller
var notes = require('../controllers/notes');
var authorization = require('./middlewares/authorization');

// Lodging authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.trip.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.post('/trips/:tripId/destinations/:destinationId/notes', authorization.requiresLogin, notes.create);
    app.get('/trips/:tripId/destinations/:destinationId/notes/:notesId', notes.show);
    app.put('/trips/:tripId/destinations/:destinationId/notes/:notesId', authorization.requiresLogin, hasAuthorization, notes.update);
    app.del('/trips/:tripId/destinations/:destinationId/notes/:notesId', authorization.requiresLogin, hasAuthorization, notes.destroy);

    // Finish with setting up the notesId param
    app.param('notesId', notes.notes);
};