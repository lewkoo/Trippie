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
        beforeEach(function(done) {
            user = new User({
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                lodging = new Lodging({
                    name: 'Lodging Name',
                    address: 'Lodging Address',
                    arrivalDate: '2014-05-05'
                });
                destination = new Destination({
                    name: 'Test destination',
                    lodgingIDs: [lodging]
                });
                trip = new Trip({
                    name: 'Test trip',
                    user: user,
                    initialDestinationID: destination
                });

                done();
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

            it('should be saved in a destination', function(done) {
                var isMatch = false;
                var i;
                for (i = 0; i < destination.lodgingIDs.length; i++) {
                    if (destination.lodgingIDs[i].should.equal(lodging._id)) {
                        isMatch = true;
                    }
                }
                isMatch.should.equal(true);
                done();
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