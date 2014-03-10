'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Trip = mongoose.model('Trip'),
    Destination = mongoose.model('Destination');

//Globals
var user;
var trip;
var destination;

//The tests
describe('<Unit Test>', function() {
    describe('Model Destination:', function() {
        beforeEach(function(done) {
            user = new User({
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                // add transportation object to outgoingTransportationID of destination
                destination = new Destination({
                    name: 'Test destination'
                });
                trip = new Trip({
                    name: 'Test trip',
                    user: user,
                    destinationList: [destination]
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return destination.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without a name', function(done) {
                destination.name = '';

                return destination.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be saved in a trip', function(done) {
                (trip.destinationList).should.contain(destination._id);
                done();
            });

        });
 
       afterEach(function(done) {
            Destination.remove({});
            Trip.remove({});
            User.remove({});
            done();
        });
       after(function(done) {
            Destination.remove().exec();
            Trip.remove().exec();
            User.remove().exec();
            done();
        });
    });
});
