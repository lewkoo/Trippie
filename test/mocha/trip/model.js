'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Trip = mongoose.model('Trip');

//Globals
var user;
var trip;

//The tests
describe('<Unit Test>', function() {
    describe('Model Trip:', function() {
        beforeEach(function(done) {
            user = new User({
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                trip = new Trip({
                    name: 'Test trip',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return trip.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without a name', function(done) {
                trip.name = '';

                return trip.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Trip.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            Trip.remove().exec();
            User.remove().exec();
            done();
        });
    });
});