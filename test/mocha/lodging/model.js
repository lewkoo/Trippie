'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Trip = mongoose.model('Trip'),
    Destination = mongoose.model('Destination'),
    Lodging = mongoose.model('Lodging');

//Globals
var user;
var trip;
var destination;
var lodging;

//The tests
describe('<Unit Test>', function() {
    describe('Model Lodging:', function() {
        before(function(done) {
            user = new User({
                email: 'mail@trippie.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(errUser, objUser, numAffectedUser) {
                trip = new Trip({
                    name: 'Test trip',
                    user: objUser
                });

                trip.save(function(errTrip, objTrip, numAffectedTrip) {
                    destination = new Destination({
                        name: 'TestDest',
                        trip: trip,
                        information: 'ZZZZ11'
                    });

                    destination.save(function(errDest, objDest, numAffectedDest) {
                        lodging = new Lodging({
                            name: 'House of Cards',
                            address: '123 Test St',
                            destinationID: destination,
                            arrivalDate: '2014-02-09',
                            information: '12345'
                        });
                        done();
                    });
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return lodging.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without name', function(done) {
                lodging.name = '';

                return lodging.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without address', function(done) {
                lodging.address = '';

                return lodging.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Lodging.remove({});
            Destination.remove({});
            Trip.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            Lodging.remove().exec();
            Destination.remove().exec();
            Trip.remove().exec();
            User.remove().exec();
            done();
        });
    });
});