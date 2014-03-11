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
var testTripName = 'Test trip';
var testDate = new Date();

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
                    name: testTripName,
                    user: user,
                    tripStartDate: testDate,
                    tripEndDate: testDate
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

            it('should be able to show an error when try to save without a user', function(done) {
                trip.user = null;

                return trip.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without a trip start date', function(done) {
                trip.tripStartDate = null;

                return trip.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without a trip end date', function(done) {
                trip.tripEndDate = null;

                return trip.save(function(err) {
                    should.exist(err);
                    done();
                });
            });


            it('should be able to show an error when tripEndDate < tripStartDate', function(done) {
                trip.tripEndDate   = new Date(2014, 2, 11, 12, 0, 0, 0);//trip End Date is one day earlier here
                trip.tripStartDate = new Date(2014, 2, 12, 12, 0, 0, 0); 

                return trip.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        describe('Method findOne', function() {

            it('should read the trip name from database', function(done){
                trip.save(function(){
                    Trip.findOne({}, function(err, dbTrip) {
                        dbTrip.name.should.equal(testTripName);
                        done();
                    });
                });
            });

            it('should read the trip start date from database', function(done) {
                trip.save(function(){
                    Trip.findOne({}, function(err, dbTrip) {
                        String(dbTrip.tripStartDate).should.equal(String(testDate));
                        done();
                    });
                });
            });

            it('should read the trip end date from database', function(done) {
                trip.save(function(){
                    Trip.findOne({}, function(err, dbTrip) {
                        String(dbTrip.tripEndDate).should.equal(String(testDate));
                        done();
                    });
                });
            });
        });

        describe('Method update', function() {
            it('should update the trip name in the database', function(done) {
                var newTripName = 'Winnipeg - Warsaw - Lviv - Kyiv - Simferopol';
                trip.name = newTripName;
                trip.update({'_id': trip._id}, {$set: {'name': newTripName}}, function(err, dbTrip){
                    if (!err){
                        dbTrip.name.should.equal(newTripName);
                    }
                    done();
                });
            });

            it('should update the trip start date in the database', function(done) {
                var newTripStartDate = new Date();
                trip.tripStartDate = newTripStartDate;
                trip.update({'_id': trip._id}, {$set: {'name': newTripStartDate}}, function(err, dbTrip){
                    if (!err){
                        dbTrip.name.should.equal(newTripStartDate);
                    }
                    done();
                });
            });

            it('should update the trip end date in the database', function(done) {
                var newTripEndDate = new Date();
                trip.tripEndDate = newTripEndDate;
                trip.update({'_id': trip._id}, {$set: {'name': newTripEndDate}}, function(err, dbTrip){
                    if (!err){
                        dbTrip.name.should.equal(newTripEndDate);
                    }
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