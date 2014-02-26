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
var testAddress = '201 Main St, Winnipeg, MB';
var testInfo = 'My workplace; do not be late';
var testDate = new Date();
var testEventName = 'Test event';

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
                	name: testEventName,
		    	address: testAddress,
		    	information: testInfo,
		    	eventStartDate: testDate,
		    	eventEndDate: testDate
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
            	it('should begin with 0 events saved', function(done) {
               	 	Event.find({}, function(err, events) {
                    		events.should.have.length(0);
                    		done();
               	 	});
            	});	
	    	it('should be able to save without problems', function(done) {
                	return event.save(function(err) {
                    		should.not.exist(err);
                    		done();
                	});
            	});
	    
		/* Required fields */
            	it('should be able to show an error when try to save without a name', function(done) {
               	 	event.name = '';

                	return event.save(function(err) {
                    		should.exist(err);
                    		done();
                	});
            	});
		it('should be able to show an error when try to save without a start date', function(done) {
                	event.eventStartDate = null;

                	return event.save(function(err) {
                    		should.exist(err);
                    		done();
                	});
            	});
		it('should be able to show an error when try to save without an end date', function(done) {
                	event.eventEndDate = null;

                	return event.save(function(err) {
                    		should.exist(err);
                		done();
                	});
        	});
		/* Optional fields */
		it('should be able to save without address data', function(done) {
                	event.address = '';

               		return event.save(function(err) {
        	            should.not.exist(err);
	                    done();
                	});
      		});
		it('should be able to save without information data', function(done) {
        	        event.information = null;

	                return event.save(function(err) {
                    		should.not.exist(err);
                    		done();
               		 });
           	 });

		/* Structure */ 
         	it('should save event in a destination', function(done) {
			destination.eventIDs[0].should.equal(event._id)
	         	done();
            	});

		/* Read from DB */	

		it('should have the saved event name', function(done){
			event.save(function(){
                		Event.findOne({}, function(err, dbEvent) {
                    			dbEvent.name.should.equal(testEventName);
                    			done();
                		});
			});
		});

 		it('should have the saved event address', function(done){
                        event.save(function(){
				Event.findOne({}, function(err, dbEvent) {
					dbEvent.address.should.equal(testAddress);
					done();
				});
                        });
                });

		it('should have the saved event information', function(done) {
                        event.save(function(){
				Event.findOne({}, function(err, dbEvent) {
					dbEvent.information.should.equal(testInfo);
					done();
				});
			});
                });

		it('should have the saved eventStartDate', function(done) {
                        event.save(function(){
				Event.findOne({}, function(err, dbEvent) {
					String(dbEvent.eventStartDate).should.equal(String(testDate));
					done();
				});
			});
                });

		it('should have the saved event eventEndDate', function(done) {
                        event.save(function(){
				Event.findOne({}, function(err, dbEvent) {
					String(dbEvent.eventEndDate).should.equal(String(testDate));
					done();
				});
			});
                });
		
		/* Update DB */

        });
 
       afterEach(function(done) {
            Event.remove({});
	    Destination.remove({});
            Trip.remove({});
            User.remove({});
            done();
       });
       after(function(done) {
	    Event.remove({}).exec();
            Destination.remove().exec();
            Trip.remove().exec();
            User.remove().exec();
            done();
       });
    });
});
