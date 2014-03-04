'use strict';

// Lodgings routes use lodgings controller
var lodgings = require('../controllers/lodgings');
var authorization = require('./middlewares/authorization');

// Lodging authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.lodging.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

	// Finish with setting up the lodgingId param
    //app.param('lodgingId', lodgings.lodging);

    app.get('/lodgings', lodgings.all);
    app.post('/lodgings', authorization.requiresLogin, lodgings.create);
    app.get('/lodgings/:lodgingId', lodgings.show);
    app.put('/lodgings/:lodgingId', authorization.requiresLogin, hasAuthorization, lodgings.update);
    app.del('/lodgings/:lodgingId', authorization.requiresLogin, hasAuthorization, lodgings.destroy);

};