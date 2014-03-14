'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        message: req.flash('error'),
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    var isApiCall = ((req.url).indexOf('api') > -1);

    if (isApiCall) {
        res.jsonp({success: true});
    } else {
        res.redirect('/');
    }
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var isApiCall = ((req.url).indexOf('api') > -1);
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
        if (err) {

            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Email already in use';
                    break;
                default:
                    //push the error messages into the array
                    var result = [];
                    for(var i in err.errors)
                        result.push([i, err.errors [i]]);

                    console.log(result);

                    //grab the first error
                    var error = result[0];
                    //store the message
                    message = error[1].message;

            }

            if (isApiCall) {
                res.status(409);
                return res.jsonp({ message: message });
            }
            else {
                return res.render('users/signup', {
                    message: message,
                    user: user
                });
            }
            
        }

        if (isApiCall) {
            res.status(201);
            return res.jsonp({ user: user.email });
        } else {
            req.logIn(user, function(err) {
                if (err) return next(err);
                return res.redirect('/#!/trips');
            });
        }
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};
