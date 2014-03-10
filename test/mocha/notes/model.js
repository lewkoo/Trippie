'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Trip = mongoose.model('Trip'),
    Destination = mongoose.model('Destination'),
    Note = mongoose.model('Note');

//Globals
var user;
var trip;
var destination;
var note;

//The tests
describe('<Unit Test>', function() {
    describe('Model Note:', function() {
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
                        note = new Note({
                            name: 'House of Cards',
                            destinationID: destination,
                            information: '12345'
                        });
                        done();
                    });
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return note.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without name', function(done) {
                note.name = '';

                return note.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

        });

        afterEach(function(done) {
            Note.remove({});
            Destination.remove({});
            Trip.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            Note.remove().exec();
            Destination.remove().exec();
            Trip.remove().exec();
            User.remove().exec();
            done();
        });
    });
});