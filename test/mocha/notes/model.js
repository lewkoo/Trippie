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

        /* Load */
        describe('Method Load', function() {
            it('should be able to load without problems', function(done) {
                return Note.load(note._id, function(err, note) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should not be able to load with junk id', function(done) {
                var id = '1232341234';
                return Note.load(id, function(err, note) {
                    should.exist(err);
                    done();
                });
            });
        });

        /* Save */
        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return note.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

             /* Optional fields */
            it('should be able to save without information data', function(done) {
                note.information = null;
 
                return note.save(function(err) {
                   should.not.exist(err);
                   done();
               });
            });

            it('should be able to save with special characters for data', function(done) {
                note.name = '!@#$%^&*()_+|}{:?><';
                note.address = '!@#$%^&*()_+|}{:?><';
                note.information = '!@#$%^&*()_+|}{:?><';
 
                return note.save(function(err) {
                   should.not.exist(err);
                   done();
               });
            });

           it('should be able to save with foreign characters for data', function(done) {
                note.name = 'ÀÂÄÈÉÊËÎÏÔŒÙÛÜŸàâäèéêëîïôœùûüÿ';
                note.address = 'ÀÂÄÈÉÊËÎÏÔŒÙÛÜŸàâäèéêëîïôœùûüÿ';
                note.information = 'ÀÂÄÈÉÊËÎÏÔŒÙÛÜŸàâäèéêëîïôœùûüÿ';
 
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

        describe('Method Find', function() {
                it('should be able to find the saved note', function(done) {
                    note.save(function(err) {
                        Note.find({}, function(err, notes) {
                            notes.should.have.length(1);
                            done();
                    });
                });
            });
        });

        describe('Method FindOne', function() {
            it('should be able to read a note', function(done) {
                note.save(function(err) {
                    Note.findOne({}, function(err, dbNote) {
                        should.exist(dbNote);
                        done();
                    });
                });
            });
        });

        /* Update */
        describe('Method update', function() {
            it('should update the name in the database', function(done) {
                var newNoteName = 'The Radisson';
                note.name = newNoteName;
                note.update({'_id': note._id}, {$set: {'name': newNoteName}}, function(err, dbNote){
                    if (!err){
                       dbNote.name.should.equal(newNoteName);
                    }
                    done();
               });
            });
            it('should update the info in the database', function(done) {
                var newInfo = 'sick Hotel';
                note.information = newInfo;
                note.update({'_id': note._id}, {$set: {'information': newInfo}}, function(err, dbNote){
                    if (!err){
                       dbNote.information.should.equal(newInfo);
                    }
                    done();
                });
            });
        });

        /* Delete */
        describe('Method Delete', function() {
            it('should be able to delete without problems', function(done) {
                return Note.remove(note._id, function(err, note) {
                    should.not.exist(err);
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