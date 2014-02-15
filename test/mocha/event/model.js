'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Trip = mongoose.model('Trip'),
    Destination = mongoose.model('Destination'),
    Event = mongoose.model('Event');

//Globals
var user;
var trip;
var destination;
var event;

//The tests
describe('<Unit Test>', function() {
    describe('Model Event:', function() {
        beforeEach(function(done) {
            user = new User({
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                event = new Event({
                    name: 'Test event'
                });
		destination = new Destination({
                    name: 'Test destination',
                    eventIDs: [event]
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
                return event.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without a name', function(done) {
                event.name = '';

                return event.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be saved in a destination', function(done) {
                var isMatch = false;
                var i;
                for (i = 0; i < destination.eventIDs.length; i++) {
                    if (destination.eventIDs[i].should.equal(event._id)) {
                        isMatch = true;
                    }
                }
                isMatch.should.equal(true);
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
