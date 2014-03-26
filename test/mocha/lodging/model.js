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

        /* Load */
        describe('Method Load', function() {
            it('should be able to load without problems', function(done) {
                return Lodging.load(lodging._id, function(err, lodging) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should not be able to load with junk id', function(done) {
                var id = '1232341234';
                return Lodging.load(id, function(err, lodging) {
                    should.exist(err);
                    done();
                });
            });
        });

        /* Save */
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

            it('should be able to show an error when try to save without arrivalDate', function(done) {
                lodging.arrivalDate = null;

                return lodging.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        describe('Method Find', function() {
                it('should be able to find the saved lodging', function(done) {
                    lodging.save(function(err) {
                        Lodging.find({}, function(err, lodgings) {
                            lodgings.should.have.length(1);
                            done();
                    });
                });
            });
        });

        describe('Method FindOne', function() {
            it('should be able to read a lodging', function(done) {
                lodging.save(function(err) {
                    Lodging.findOne({}, function(err, dbLodging) {
                        should.exist(dbLodging);
                        done();
                    });
                });
            });
        });

        /* Update */
        describe('Method update', function() {
            it('should update the name in the database', function(done) {
                var newLodgingName = 'The Radisson';
                lodging.name = newLodgingName;
                lodging.update({'_id': lodging._id}, {$set: {'name': newLodgingName}}, function(err, dbLodging){
                    if (!err){
                       dbLodging.name.should.equal(newLodgingName);
                    }
                    done();
               });
            });
            it('should update the address in the database', function(done) {
                var newAddress = '3434 Portage Ave.';
                lodging.address = newAddress;
                lodging.update({'_id': lodging._id}, {$set: {'address': newAddress}}, function(err, dbLodging){
                    if (!err){
                       dbLodging.address.should.equal(newAddress);
                    }
                    done();
               });
            });
            it('should update the info in the database', function(done) {
                var newInfo = 'sick Hotel';
                lodging.information = newInfo;
                lodging.update({'_id': lodging._id}, {$set: {'information': newInfo}}, function(err, dbLodging){
                    if (!err){
                       dbLodging.information.should.equal(newInfo);
                    }
                    done();
                });
            });
            it('should update the arrival date in the database', function(done) {
                var newDate = new Date(2014, 12, 12);
                lodging.arrivalDate = newDate;
                lodging.update({'_id': lodging._id}, {$set: {'arrivalDate': newDate}}, function(err, dbLodging){
                    if (!err){
                       dbLodging.arrivalDate.should.equal(newDate);
                    }
                    done();
               });
            });
            it('should update the departure date in the database', function(done) {
                var newDate = new Date(2014, 11, 11);
                lodging.departureDate = newDate;
                lodging.update({'_id': lodging._id}, {$set: {'departureDate': newDate}}, function(err, dbLodging){
                    if (!err){
                       dbLodging.departureDate.should.equal(newDate);
                    }
                    done();
               });
            });
        });

        /* Delete */
        describe('Method Delete', function() {
            it('should be able to delete without problems', function(done) {
                return Lodging.remove(lodging._id, function(err, lodging) {
                    should.not.exist(err);
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