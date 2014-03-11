'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Transportation = mongoose.model('Transportation');

//Globals
var transportation;
var transportType = 'plane';
var information = 'WS404';
var departureTime = new Date(2014, 6, 12);
var arrivalTime = new Date(2014, 6, 20);

//The tests
describe('<Unit Test>', function() {
    describe('Model Transportation:', function() {
        beforeEach(function(done) {
            transportation = new Transportation({
                transportType: transportType,
                information: information,
                departureTime: departureTime,
                arrivalTime: arrivalTime
            });
            done();
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

            it('should be able to show an error trying to save with a departureTime after the arrivalTime', function(done) {
                transportation.departureTime = new Date(2014, 4, 21);
                transportation.arrivalTime = new Date(2014, 4, 20);

                return transportation.save(function(err) {
                    should.exist(err);
                    done();
                })
            });
        });

        describe('Method Find', function() {
            it('should be able to find the saved transportation', function(done) {
                transportation.save(function(err) {
                    Transportation.find({}, function(err, transportations) {
                        transportations.should.have.length(1);
                        done();
                    });
                });
            });
        });

        describe('Method FindOne', function() {
            it('should be able to read a transportation', function(done) {
                transportation.save(function(err) {
                    Transportation.findOne({}, function(err, dbTransportation) {
                        should.exist(dbTransportation);
                        String(dbTransportation.transportType).should.equal(String(transportType));
                        String(dbTransportation.information).should.equal(String(information));
                        dbTransportation.departureTime.getTime().should.equal(departureTime.getTime());
                        dbTransportation.arrivalTime.getTime().should.equal(arrivalTime.getTime());
                        done();
                    });
                });
            });
        });

        describe('Method Update', function() {
            it('should be able to update a transportation transportType', function(done) {
                var newTransportType = 'other';

                transportation.save(function(err) {
                    transportation.transportType = newTransportType;
                    transportation.save(function(err) {
                        should.not.exist(err);
                        transportation.transportType.should.equal(newTransportType);
                        done();
                    });
                });
            });

            it('should be able to update a transportation information', function(done) {
                var newInformation = 'WS200';

                transportation.save(function(err) {
                    transportation.information = newInformation;
                    transportation.save(function(err) {
                        should.not.exist(err);
                        transportation.information.should.equal(newInformation);
                        done();
                    });
                });
            });

            it('should be able to update a transportation departureTime', function(done) {
                var newDepartureTime = new Date(2014, 6, 15);

                transportation.save(function(err) {
                    transportation.departureTime = newDepartureTime;
                    transportation.save(function(err) {
                        should.not.exist(err);
                        transportation.departureTime.should.equal(newDepartureTime);
                        done();
                    });
                });
            });

            it('should be able to update a transportation arrivalTime', function(done) {
                var newArrivalTime = new Date(2014, 7, 12);

                transportation.save(function(err) {
                    transportation.arrivalTime = newArrivalTime;
                    transportation.save(function(err) {
                        should.not.exist(err);
                        transportation.arrivalTime.should.equal(newArrivalTime);
                        done();
                    });
                });
            });
        });

        afterEach(function(done) {
            Transportation.remove().exec();
            done();
        });

        after(function(done) {
            Transportation.remove().exec();
            done();
        });
    });
});