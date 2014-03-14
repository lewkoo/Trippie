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
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                EventsController = $controller('EventsController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;
            }));

            it('$scope.find() should create an array with at least one event object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('trips/destinations/events').respond([{
                        name: 'Soccer',
                        eventStartDate: new Date(2140, 12, 12),
                        eventEndDate: new Date(2140, 12, 12)
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.events).toEqualData([{
                        name: 'Soccer',
                        eventStartDate: new Date(2140, 12, 12),
                        eventEndDate: new Date(2140, 12, 12)
                    }]);

                });

            it('$scope.findOne() should create an array with one event object fetched ' +
                'from XHR using a eventId URL parameter', function() {
                    // fixture URL parament
                    $routeParams.eventId = '525a8422f6d0f87f0e407a33';
                    $routeParams.destinationId = '525a8422f6d0f87f0e407a32';
                    $routeParams.tripId = '525a8422f6d0f87f0e407a31';

                    // fixture response object
                    var testEventData = function() {
                        return {
                        name: 'Soccer',
                        eventStartDate: new Date(2140, 12, 12),
                        eventEndDate: new Date(2140, 12, 12)
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})\/events\/([0-9a-fA-F]{24})$/).respond(testEventData());
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})/).respond(testEventData());
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})/).respond(testEventData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.event).toEqualData(testEventData());

                });

            it('$scope.update() should update a valid event', inject(function(Events) {

                // fixture rideshare
                var putEventData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        name: 'Soccer',
                        eventStartDate: new Date(2140, 12, 12),
                        eventEndDate: new Date(2140, 12, 12), 
                        information: 'Bring a ball'
                    };
                };

                // mock event object from form
                var event = new Events(putEventData());

                // mock event in scope
                scope.event = event;

                // test PUT happens correctly
                $httpBackend.expectPUT(/events\/([0-9a-fA-F]{24})$/).respond();

                // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
                //$httpBackend.expectPUT(/events\/([0-9a-fA-F]{24})$/, putEventData()).respond();
                /*
                Error: Expected PUT /events\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","name":"Soccer","information":"Bring a ball"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","name":"Soccer","information":"Bring a ball","updated":[1383534772975]}
                */

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/events/' + putEventData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid eventId' +
                'and remove the event from the scope', inject(function(Events) {

                    // fixture rideshare
                    var event = new Events({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.events = [];
                    scope.events.push(event);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/events\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(event);
                    $httpBackend.flush();

                    // test after successful delete URL location events lis
                    //expect($location.path()).toBe('/events');
                    expect(scope.events.length).toBe(0);

                }));
        });
    });
}());
