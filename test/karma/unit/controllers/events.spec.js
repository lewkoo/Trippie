'use strict';

(function() {
    // Events Controller Spec
    describe('Trippie controllers', function() {
        describe('EventsController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('trippie'));

            // Initialize the controller and a mock scope
            var EventsController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_, Events, Destinations, Trips) {

                scope = $rootScope.$new();

                $routeParams = _$routeParams_;
                $routeParams.tripId = '525a8422f6d0f87f0e000000';
                $routeParams.destinationId = '525a8422f6d0f87f0e000001';

                EventsController = $controller('EventsController', {
                    $scope: scope
                });

                scope.eventId = '525a8422f6d0f87f0e000003';
                scope.eventName = 'Test Event1';
                scope.eventAddress = '123 Fake Street';
                scope.eventInformation = 'Test Event Information';
                var eventDate = new Date();
                eventDate.setMinutes(0);
                eventDate.setSeconds(0);
                eventDate.setMilliseconds(0);
                scope.eventStartDate = eventDate;
                scope.eventEndDate = eventDate;

                scope.destName = 'Test Destination';
                scope.destinationId = '525a8422f6d0f87f0e000001';
                scope.tripName = 'Test Trip';
                scope.tripId = '525a8422f6d0f87f0e000000';
                scope.destinationList = [scope.destinationId];

                var event = new Events({
                    name: scope.destName,
                    address: scope.eventAddress,
                    information: scope.eventInformation,
                    eventStartDate: scope.eventStartDate,
                    eventEndDate: scope.eventEndDate,
                    destinationId: $routeParams.destinationId
                });
                event._id = scope.eventId;
                scope.event = event;
                scope.events = [scope.event];

                var destination = new Destinations({
                    name: scope.destName,
                    eventIDs: [scope.eventId]
                });
                destination._id = scope.destinationId;
                scope.destination = destination;
                
                var trip = new Trips({
                    name: scope.tripName,
                    destinationList: scope.destinationList
                });
                trip._id = scope.tripId;
                scope.trip = trip;

                $httpBackend = _$httpBackend_;

                $location = _$location_;
            }));

            it('$scope.find() should create an array with at least one event object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})\/events$/).respond([{
                        _id: scope.eventId,
                        name: scope.destName,
                        address: scope.eventAddress,
                        information: scope.eventInformation,
                        eventStartDate: scope.eventStartDate,
                        eventEndDate: scope.eventEndDate,
                        destinationId: $routeParams.destinationId
                    }]);
                    $httpBackend.expectGET('views/index.html').respond(200);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.events).toEqualData([{
                        _id: scope.eventId,
                        name: scope.destName,
                        address: scope.eventAddress,
                        information: scope.eventInformation,
                        eventStartDate: scope.eventStartDate,
                        eventEndDate: scope.eventEndDate,
                        destinationId: scope.destinationId
                    }]);

                });

            it('$scope.findOne() should create an array with one event object fetched ' +
                'from XHR using a eventId URL parameter', function() {

                    var date = new Date();

                    // expected response data
                    var responseTripData = {
                            _id: scope.trip._id,
                            name: scope.trip.name,
                            destinationList: scope.trip.destinationList
                        };

                    // expected response data
                    var responseDestinationData = {
                            _id: scope.destId,
                            name: scope.destination.name,
                            outgoingTransportationID: scope.destOutgoingTransportationID
                        };

                    // expected response data
                    var responseEventData = {
                            _id: scope.eventId,
                            name: 'Soccer',
                            eventStartDate: date,
                            eventEndDate: date
                        };

                    // remove the trip, destination, and event
                    scope.trip = {};
                    scope.destination = {};
                    scope.event = {};

                    // test expected GET request with response object
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})\/events\/([0-9a-fA-F]{24})$/).respond(responseEventData);
                    $httpBackend.expectGET('views/index.html').respond(200);
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})$/).respond(responseDestinationData);
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})$/).respond(responseTripData);

                    // run controller
                    scope.findOne(scope.eventId);
                    $httpBackend.flush();

                    // test scope values
                    expect(scope.trip).toEqualData({
                        _id: scope.tripId,
                        name: scope.tripName,
                        destinationList: scope.destinationList
                    });
                    expect(scope.destination).toEqualData({
                        _id: scope.destId,
                        name: scope.destName,
                        outgoingTransportationID: scope.destOutgoingTransportationID
                    });
                    // test scope value
                    expect(scope.event).toEqualData({
                        _id: scope.eventId,
                        name: 'Soccer',
                        eventStartDate: date,
                        eventEndDate: date
                    });

                });

            it('$scope.update() should update a valid event', function() {

                var date = new Date();

                scope.event._id = scope.eventId;
                scope.event.name = 'Soccer';
                scope.event.information = 'Bring a ball';
                scope.event.eventStartDate = date.toISOString();
                scope.event.eventEndDate = date.toISOString();
                scope.event.destinationId = scope.destinationId;
                scope.event.address = '124 Fake Street';

                // expected PUT data
                var putEventData = {
                    name:'Soccer',
                    address:'124 Fake Street',
                    information:'Bring a ball',
                    eventStartDate:date.toISOString(),
                    eventEndDate:date.toISOString(),
                    destinationId:'525a8422f6d0f87f0e000001',
                    _id:'525a8422f6d0f87f0e000003'
                };

                // expected response data
                var responseEventData = {
                        name: 'Soccer',
                        address: '124 Fake Street',
                        information: 'Bring a ball',
                        eventStartDate: date,
                        eventEndDate: date, 
                        destinationId: scope.destinationId,
                        _id: scope.eventId
                    };

                // test PUT happens correctly
                $httpBackend.expectPUT(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})\/events\/([0-9a-fA-F]{24})$/, scope.event).respond(responseEventData);
                $httpBackend.expectGET('views/index.html').respond(200);
                
                // run controller
                scope.update();
                $httpBackend.flush();

            });

            it('$scope.remove() should GET the destination, remove the eventID from its eventIDs and update(PUT) the destination, ' +
                'then DELETE the event, then remove the event from scope.events', function() {

                    // expected response data
                    var responseDestinationData = {
                            _id: scope.destId,
                            name: scope.destination.name,
                            eventIDs: [scope.eventId]
                        };

                    // expected PUT data
                    var putDestinationData = {
                            _id: scope.destId,
                            name: scope.destination.name,
                            eventIDs: []
                        };

                    // expected response data
                    var responseDestinationData2 = {
                            _id: scope.destId,
                            name: scope.destination.name,
                            eventIDs: []
                        };

                    // test expected destination GET request
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})$/).respond(responseDestinationData);
                    $httpBackend.expectGET('views/index.html').respond(200);
                    // test expected destination PUT request
                    $httpBackend.expectPUT(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})$/, putDestinationData).respond(responseDestinationData2);
                    // test expected DELETE request
                    $httpBackend.expectDELETE(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})\/events\/([0-9a-fA-F]{24})$/).respond();

                    // run controller
                    scope.remove(scope.event);
                    $httpBackend.flush();

                    // test removal of event from scope
                    expect(scope.events.length).toBe(0);

                });
        });
    });
}());
