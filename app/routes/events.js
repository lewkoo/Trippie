'use strict';

// Required controllers
var events = require('../controllers/events');
var authorization = require('./middlewares/authorization');

// Authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.event.id !== req.event.id){ //req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/events', events.all);
    app.post('/events', authorization.requiresLogin, events.create);
    app.get('/events/:eventId', events.all);
    //app.put('/events/:eventId', authorization.requiresLogin, hasAuthorization, events.update);
    app.del('/events/:eventId', authorization.requiresLogin, hasAuthorization, events.destroy);

    // Finish with setting up the param
    app.param('eventId', events.event);
};
