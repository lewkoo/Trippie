'use strict';

(function() {
    // Lodgings Controller Spec
    describe('Trippie controllers', function() {
        describe('LodgingsController', function() {
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
            var LodgingsController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                LodgingsController = $controller('LodgingsController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one lodging object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET('trips/destinations/lodgings').respond([{
                        name: 'A Place for Me',
                        address: '4331 Aiur Rd.',
                        arrivalDate: '2014-06-07'
                    }]);

                    // run controller
                    scope.find();
                    $httpBackend.expectGET('views/index.html').respond(200);
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.lodgings).toEqualData([{
                        name: 'A Place for Me',
                        address: '4331 Aiur Rd.',
                        arrivalDate: '2014-06-07'
                    }]);

                });

            it('$scope.findOne() should create an array with one lodging object fetched ' +
                'from XHR using a lodgingId URL parameter', function() {
                    // fixture URL parament
                    $routeParams.lodgingId = '525a8422f6d0f87f0e407a33';
                    $routeParams.destinationId = '525a8422f6d0f87f0e407a32';
                    $routeParams.tripId = '525a8422f6d0f87f0e407a31';

                    // fixture response object
                    var testLodgingData = function() {
                        return {
                            name: 'A Place for Me',
                            address: '4331 Aiur Rd.',
                            arrivalDate: '2014-06-07'
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})\/lodgings\/([0-9a-fA-F]{24})$/).respond(testLodgingData());
                    $httpBackend.expectGET('views/index.html').respond(200);
                    $httpBackend.expectGET('trips/destinations').respond(testLodgingData());
                    $httpBackend.expectGET('trips').respond(testLodgingData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.lodging).toEqualData(testLodgingData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture expected POST data
                    var postLodgingData = function() {
                        return {
                            name: 'A Place for Me',
                            address: '4331 Aiur Rd.',
                            arrivalDate: '2014-06-07',
			    departureDate: '2014-06-08'
                        };
                    };

                    // fixture expected response data
                    var responseLodgingData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            name: 'A Place for Me',
                            address: '4331 Aiur Rd.',
                            arrivalDate: '2014-06-07',
			    departureDate: '2014-06-08'
                        };
                    };

                    // fixture mock form input values
                    scope.name = 'A Place for Me';
                    scope.address = '4331 Aiur Rd.';
                    scope.arrivalDate = '2014-06-07';
		    scope.departureDate = '2014-06-08';

                    // test post request is sent
                    $httpBackend.expectPOST('trips/destinations/lodgings', postLodgingData()).respond(responseLodgingData());

                    // Run controller
                    scope.create();
                    $httpBackend.expectGET('views/index.html').respond(200);
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.name).toEqual('');
                    expect(scope.address).toEqual('');
                    expect(scope.arrivalDate).toEqual(null);
                    expect(scope.departureDate).toEqual(null);

                    // test URL location to new object
                    expect($location.path()).toBe('/');
                });

            it('$scope.update() should update a valid lodging', inject(function(Lodgings) {

                // fixture rideshare
                var putLodgingData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        name: 'A Place for Me',
                        to: 'Out back'
                    };
                };

                // mock lodging object from form
                var lodging = new Lodgings(putLodgingData());

                // mock lodging in scope
                scope.lodging = lodging;

                // test PUT happens correctly
                $httpBackend.expectPUT('trips/destinations/lodgings').respond();

                // run controller
                scope.update();
                $httpBackend.expectGET('views/index.html').respond(200);
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/');

            }));

            xit('$scope.remove() should send a DELETE request with a valid lodgingId' +
                'and remove the lodging from the scope', inject(function(Lodgings) {

                    // fixture rideshare
                    var lodging = new Lodgings({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.lodgings = [];
                    scope.lodgings.push(lodging);

                    // test expected rideshare DELETE request
                    //$httpBackend.expectDELETE('trips/destinations/lodgings').respond();
                    //$httpBackend.expectDELETE(/lodgings\/([0-9a-fA-F]{24})$/).respond(204);
                    $httpBackend.expectGET('views/index.html').respond(200);

                    // run controller
                    scope.remove(lodging);
                    $httpBackend.flush();

                    // test after successful delete URL location lodgings lis
                    //expect($location.path()).toBe('/lodgings');
                    expect(scope.lodgings.length).toBe(0);

                }));
        });
    });
}());
