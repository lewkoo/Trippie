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
             
              destination = new Destination({
               name: 'Test destination',
               eventIDs: []
           });
              event = new Event({
               name: testEventName,
               address: testAddress,
               information: testInfo,
               eventStartDate: testDate,
               eventEndDate: testDate,
               destinationID: destination
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
           it('should be able to show an error when try to save without a destination', function(done) {
               event.destinationID = null;

               return event.save(function(err) {
                  should.exist(err);
                  done();
              });
           });
           it('should be able to show an error when eventEndDate < eventStartDate', function(done) {
			event.eventEndDate   = new Date(2014, 2, 11, 12, 0, 0, 0);//event End Date is one day earlier here
			event.eventStartDate = new Date(2014, 2, 12, 12, 0, 0, 0);
			
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
       });

/* Read from DB */	
describe('Method findOne', function() {
  it('should read the event name from database', function(done){
     event.save(function(){
      Event.findOne({}, function(err, dbEvent) {
         dbEvent.name.should.equal(testEventName);
         done();
     });
  });
 });

  it('should read the event address from database', function(done){
    event.save(function(){
        Event.findOne({}, function(err, dbEvent) {
           dbEvent.address.should.equal(testAddress);
           done();
       });
    });
});

  it('should read the event information from database', function(done) {
    event.save(function(){
        Event.findOne({}, function(err, dbEvent) {
           dbEvent.information.should.equal(testInfo);
           done();
       });
    });
});

  it('should read the event start date from database', function(done) {
    event.save(function(){
        Event.findOne({}, function(err, dbEvent) {
           String(dbEvent.eventStartDate).should.equal(String(testDate));
           done();
       });
    });
});

  it('should read the event end date from database', function(done) {
    event.save(function(){
        Event.findOne({}, function(err, dbEvent) {
           String(dbEvent.eventEndDate).should.equal(String(testDate));
           done();
       });
    });
});
});

/* Update DB */
describe('Method update', function() {
  it('should update the name in the database', function(done) {
    var newEventName = 'Attend Soccer Game';
    event.name = newEventName;
    event.update({'_id': event._id}, {$set: {'name': newEventName}}, function(err, dbEvent){
        if (!err){
           dbEvent.name.should.equal(newEventName);
       }
       done();
   });
});
  it('should update the address in the database', function(done) {
    var newAddress = 'North Pole';
    event.address = newAddress;
    event.update({'_id': event._id}, {$set: {'address': newAddress}}, function(err, dbEvent){
        if (!err){
           dbEvent.address.should.equal(newAddress);
       }
       done();
   });
});
  it('should update the info in the database', function(done) {
    var newInfo = 'Big Day';
    event.information = newInfo;
    event.update({'_id': event._id}, {$set: {'information': newInfo}}, function(err, dbEvent){
        if (!err){
           dbEvent.information.should.equal(newInfo);
       }
       done();
   });
});
  it('should update the event start date in the database', function(done) {
    var newDate = new Date(2014, 12, 12);
    event.eventStartDate = newDate;
    event.update({'_id': event._id}, {$set: {'eventStartDate': newDate}}, function(err, dbEvent){
        if (!err){
           dbEvent.eventStartDate.should.equal(newDate);
       }
       done();
   });
});
  it('should update the event end date in the database', function(done) {
    var newDate = new Date(2014, 11, 11);
    event.eventEndDate = newDate;
    event.update({'_id': event._id}, {$set: {'eventEndDate': newDate}}, function(err, dbEvent){
        if (!err){
           dbEvent.eventEndDate.should.equal(newDate);
       }
       done();
   });
});
});

describe('Method Delete', function() {
    it('should be able to delete without problems', function(done) {
        return Event.remove(event._id, function(err, event) {
            should.not.exist(err);
            done();
        });
    });
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
