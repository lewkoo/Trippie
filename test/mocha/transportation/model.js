'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Trip = mongoose.model('Trip'),
    Transportation = mongoose.model('Transportation');

//Globals
var user, trip, transportation;

//The tests
describe('<Unit Test>', function() {
    describe('Model Transportation:', function() {
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
                    transportation = new Transportation({
                        transportType: 'plane',
                        information: 'WJ404',
                        departureTime: new Date(2014, 6, 12)
                    });

                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should begin with no transportation', function(done) {
                Transportation.find({}, function(err, transportations) {
                    transportations.should.have.length(0);
                    done();
                });
            });

            it('should be able to save whithout problems', function(done) {
                return transportation.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error saving with incorrect type', function(done) {
                transportation.transportType = 'submarine';

                return transportation.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when saving without departure time', function(done) {
                transportation.departureTime = null;

                return transportation.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Transportation.remove({});
            done();
        });

        after(function(done) {
            Transportation.remove().exec();
            Trip.remove().exec();
            User.remove().exec();
            done();
        });
    });
});