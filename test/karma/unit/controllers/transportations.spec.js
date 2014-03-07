'use strict';

(function() {
    // Transportations Controller Spec
    describe('Trippie controllers', function() {
        describe('TransportationsController', function() {
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
            var TransportationsController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_) {
                scope = $rootScope.$new();

                TransportationsController = $controller('TransportationsController', {
                    $scope: scope
                });

                $routeParams = _$routeParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;
            }));

            it('$scope.find() should create an array with at least one transportation object ' +
                'fetched from XHR', function() {
                    // test expected GET request
                    $httpBackend.expectGET('/transportations').respond([{
                        transportType: 'plane',
                        information: 'WS1119',
                        departureTime: new Date(2140, 12, 12)
                    }]);

                    debugger;

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.transportations).toEqualData([{
                        transportType: 'plane',
                        information: 'WS1119',
                        departureTime: new Date(2140, 12, 12)
                    }]);

                });

            it('$scope.findOne() should create an array with one transportation object fetched ' +
                'from XHR using a transportationId URL parameter', function() {
                    // fixture URL parament
                    $routeParams.transportationId = '525a8422f6d0f87f0e407a33';

                    // fixture response object
                    var testTransportationData = function() {
                        return {
                            transportType: 'plane',
                            information: 'WS1119',
                            departureTime: new Date(2140, 12, 12)
                        };
                    };

                    // test expected GET request with response object
                    $httpBackend.expectGET(/transportations\/([0-9a-fA-F]{24})$/).respond(testTransportationData());

                    // run controller
                    scope.findOne();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.transportation).toEqualData(testTransportationData());

                });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                    // fixture mock form input values
                    scope.transportType = 'plane';
                    scope.information = 'WS1119';
                    scope.departureTime = (new Date(2014, 2, 12)).toISOString();

                    // fixture expected POST data
                    var postTransportationData = function() {
                        return {
                            transportType: scope.transportType,
                            information: scope.information,
                            departureTime: scope.departureTime
                        };
                    };

                    // fixture expected response data
                    var responseTransportationData = function() {
                        return {
                            _id: '525cf20451979dea2c000001',
                            transportType: scope.transportType,
                            information: scope.information,
                            departureTime: scope.departureTime
                        };
                    };

                    // test post request is sent
                    $httpBackend.expectPOST('/transportations', postTransportationData()).respond(responseTransportationData());

                    // Run controller
                    scope.create();
                    $httpBackend.flush();

                    // test form input(s) are reset
                    expect(scope.transportType).toEqual('');
                    expect(scope.information).toEqual('');
                    expect(scope.departureTime).toEqual(null);

                    // test URL location to new object
                    expect($location.path()).toBe('/transportations/' + responseTransportationData()._id);
                });

            it('$scope.update() should update a valid transportation', inject(function(Transportations) {

                // fixture rideshare
                var putTransportationData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        transportType: 'plane',
                        information: 'WS216',
                        departureTime: new Date(2014, 2, 13)
                    };
                };

                // mock transportation object from form
                var transportation = new Transportations(putTransportationData());

                // mock transportation in scope
                scope.transportation = transportation;

                // test PUT happens correctly
                $httpBackend.expectPUT(/transportations\/([0-9a-fA-F]{24})$/).respond();

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/transportations/' + putTransportationData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid transportationId ' +
                'and remove the transportation from the scope', inject(function(Transportations) {

                    // fixture rideshare
                    var transportation = new Transportations({
                        _id: '525a8422f6d0f87f0e407a33'
                    });

                    // mock rideshares in scope
                    scope.transportations = [];
                    scope.transportations.push(transportation);

                    // test expected rideshare DELETE request
                    $httpBackend.expectDELETE(/transportations\/([0-9a-fA-F]{24})$/).respond(204);

                    // run controller
                    scope.remove(transportation);
                    $httpBackend.flush();

                    // The URL actually shouldn't change after successful delete...
                    // test after successful delete URL location transportations is
                    //expect($location.path()).toBe('/transportations');

                    // Test that the scope's length is 0
                    expect(scope.transportations.length).toBe(0);
                }));
        });
    });
}());