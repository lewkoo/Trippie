'use strict';

(function() {
    // Trips Controller Spec
    describe('Trippie controllers', function() {
        describe('TripsController', function() {
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
            var TripsController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_, Trips, Destinations) {
                scope = $rootScope.$new();

                TripsController = $controller('TripsController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;
                $routeParams.tripId = '525a8422f6d0f87f0e000000';

                scope.destName = 'Test Dest';
                scope.destId = '525a8422f6d0f87f0e000001';
                scope.tripName = 'Test Trip';
                scope.tripId = '525a8422f6d0f87f0e000000';
                scope.destinationList = ['525a8422f6d0f87f0e000001', '525a8422f6d0f87f0e000003', '525a8422f6d0f87f0e000005'];
                scope.destinationList4 = ['525a8422f6d0f87f0e000001', '525a8422f6d0f87f0e000006', '525a8422f6d0f87f0e000003', '525a8422f6d0f87f0e000005'];

                var trip = new Trips({
                    name: scope.tripName,
                    destinationList: scope.destinationList
                });
                trip._id = $routeParams.tripId;
                scope.trip = trip;

                $httpBackend = _$httpBackend_;

                $location = _$location_;
            }));

            it('$scope.create() with valid form data should send a POST request to make a trip, ' +
                'then change the location to trips/:tripID', function() {

                    // set form data
                    var date = new Date();
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    scope.tripStartD = date.toISOString();
                    scope.tripEndD = date.toISOString();
                    scope.name = scope.tripName;

                    // expected POST data
                    var postTripData = {
                            name: scope.tripName,
                            tripStartDate: scope.tripStartD,
                            tripEndDate: scope.tripEndD
                        };

                    // expected response data
                    var responseTripData = {
                            _id: scope.tripId,
                            name: scope.tripName,
                            tripStartDate: scope.tripStartD,
                            tripEndDate: scope.tripEndD,
                            destinationList: scope.destinationList
                        };


                    // test expected transportation POST request
                    $httpBackend.expectPOST(/trips$/, postTripData).respond(responseTripData);

                    // run controller
                    scope.create();
                    $httpBackend.flush();

                    // test scope values
                    expect(scope.trip).toEqualData({
                        _id: scope.tripId,
                        name: scope.trip.name,
                        tripStartDate: scope.tripStartD,
                        tripEndDate: scope.tripEndD,
                        destinationList: scope.destinationList
                    });
                    expect(scope.tripStartDate).toBeNull();
                    expect(scope.tripEndDate).toBeNull();
                    expect(scope.name).toEqual('');
                    // test URL location to new object
                    expect($location.path()).toBe('/trips/' + scope.trip._id);

                });
            
            it('$scope.remove() should DELETE the trip, then change the location to trips/:tripID', function() {

                    // test expected trip DELETE request
                    $httpBackend.expectDELETE(/trips\/([0-9a-fA-F]{24})$/).respond();

                    // run controller
                    scope.remove();
                    $httpBackend.flush();

                    // test URL location to new object
                    expect($location.path()).toBe('/trips');
                });

            it('$scope.removeDestination() should DELETE the destination, then update(PUT) the trip, ' +
                'then change the location to trips/:tripID', function() {

                    // set misc data
                    scope.trip.destinationList = scope.destinationList4;

                    // expected PUT data
                    var putTripData = {
                            _id: scope.trip._id,
                            name: scope.trip.name,
                            destinationList: scope.trip.destinationList
                        };

                    // expected response data
                    var responseTripData = {
                            _id: scope.trip._id,
                            name: scope.trip.name,
                            destinationList: scope.destinationList
                        };

                    // test expected destination DELETE request
                    $httpBackend.expectDELETE(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})$/).respond();
                    // test expected trip PUT request
                    $httpBackend.expectPUT(/trips\/([0-9a-fA-F]{24})$/, putTripData).respond(responseTripData);

                    // run controller
                    scope.removeDestination(1);
                    $httpBackend.flush();

                    // test scope values
                    expect(scope.trip).toEqualData({
                        _id: scope.trip._id,
                        name: scope.trip.name,
                        destinationList: scope.destinationList
                    });
                    // test URL location to new object
                    expect($location.path()).toBe('/trips/' + scope.trip._id);
                });

            it('$scope.update() should update(PUT) the trip, ' +
                'then change the location to trips/:tripID', function() {

                    // set form data
                    scope.tripNameUpdated = 'New Test Trip';
                    scope.trip.name = scope.tripNameUpdated;
                    var date = new Date();
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    scope.tripStartD = date.toISOString();
                    scope.tripEndD = date.toISOString();
                    scope.trip.tripStartDate = scope.tripStartD;
                    scope.trip.tripEndDate = scope.tripEndD;

                    // expected PUT data
                    var putTripData = {
                            _id: scope.trip._id,
                            name: scope.tripNameUpdated,
                            destinationList: scope.destinationList,
                            tripStartDate: scope.tripStartD,
                            tripEndDate: scope.tripEndD
                        };

                    // expected response data
                    var responseTripData = {
                            _id: scope.trip._id,
                            name: scope.tripNameUpdated,
                            destinationList: scope.destinationList,
                            tripStartDate: scope.tripStartD,
                            tripEndDate: scope.tripEndD
                        };

                    // test expected trip PUT request
                    $httpBackend.expectPUT(/trips\/([0-9a-fA-F]{24})$/, putTripData).respond(responseTripData);

                    // run controller
                    scope.update();
                    $httpBackend.flush();

                    // test scope values
                    expect(scope.trip).toEqualData({
                        _id: scope.trip._id,
                        name: scope.tripNameUpdated,
                        destinationList: scope.destinationList,
                        tripStartDate: scope.tripStartD,
                        tripEndDate: scope.tripEndD
                    });
                    // test URL location to new object
                    expect($location.path()).toBe('/trips/' + scope.trip._id);
                });

            it('$scope.find() should create an array with at least one trip object', function() {

                    // test expected GET request
                    $httpBackend.expectGET('trips').respond([{
                        _id: scope.trip._id,
                        name: scope.trip.name,
                        destinationList: scope.destinationList,
                        tripStartDate: scope.trip.tripStartDate,
                        tripEndDate: scope.trip.tripEndDate
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.trips).toEqualData([{
                        _id: scope.trip._id,
                        name: scope.trip.name,
                        destinationList: scope.destinationList,
                        tripStartDate: scope.trip.tripStartDate,
                        tripEndDate: scope.trip.tripEndDate
                    }]);

                });

            it('$scope.findOne() should GET the trip', function() {
                    
                    var date = new Date();
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                    scope.tripStartD = date.toISOString();
                    scope.tripEndD = date.toISOString();
                    scope.trip.tripStartDate = scope.tripStartD;
                    scope.trip.tripEndDate = scope.tripEndD;

                    // expected response data
                    var responseTripData = {
                            _id: scope.trip._id,
                            name: scope.trip.name,
                            destinationList: scope.trip.destinationList,
                            tripStartDate: scope.tripStartD,
                            tripEndDate: scope.tripEndD
                        };

                    // remove the trip and destination
                    scope.trip = {};
                    scope.destination = {};

                    // test expected trip GET request
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})$/).respond(responseTripData);

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope values
                    expect(scope.trip).toEqualData({
                        _id: scope.tripId,
                        name: scope.tripName,
                        destinationList: scope.destinationList,
                        tripStartDate: scope.tripStartD,
                        tripEndDate: scope.tripEndD
                    });

                });

        });
    });
}());