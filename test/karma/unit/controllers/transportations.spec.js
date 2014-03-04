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

            // it('$scope.create() with valid form data should send a POST request ' +
            //     'with the form input values and then ' +
            //     'locate to new object URL', function() {

            //         // fixture expected POST data
            //         var postTransportationData = function() {
            //             return {
            //                 title: 'An Transportation about Trippie',
            //                 content: 'Trippie rocks!'
            //             };
            //         };

            //         // fixture expected response data
            //         var responseTransportationData = function() {
            //             return {
            //                 _id: '525cf20451979dea2c000001',
            //                 title: 'An Transportation about Trippie',
            //                 content: 'Trippie rocks!'
            //             };
            //         };

            //         // fixture mock form input values
            //         scope.title = 'An Transportation about Trippie';
            //         scope.content = 'Trippie rocks!';

            //         // test post request is sent
            //         $httpBackend.expectPOST('transportations', postTransportationData()).respond(responseTransportationData());

            //         // Run controller
            //         scope.create();
            //         $httpBackend.flush();

            //         // test form input(s) are reset
            //         expect(scope.title).toEqual('');
            //         expect(scope.content).toEqual('');

            //         // test URL location to new object
            //         expect($location.path()).toBe('/transportations/' + responseTransportationData()._id);
            //     });

            // it('$scope.update() should update a valid transportation', inject(function(Transportations) {

            //     // fixture rideshare
            //     var putTransportationData = function() {
            //         return {
            //             _id: '525a8422f6d0f87f0e407a33',
            //             title: 'An Transportation about Trippie',
            //             to: 'Trippie is great!'
            //         };
            //     };

            //     // mock transportation object from form
            //     var transportation = new Transportations(putTransportationData());

            //     // mock transportation in scope
            //     scope.transportation = transportation;

            //     // test PUT happens correctly
            //     $httpBackend.expectPUT(/transportations\/([0-9a-fA-F]{24})$/).respond();

            //     // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
            //     //$httpBackend.expectPUT(/transportations\/([0-9a-fA-F]{24})$/, putTransportationData()).respond();
            //     /*
            //     Error: Expected PUT /transportations\/([0-9a-fA-F]{24})$/ with different data
            //     EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Transportation about Trippie","to":"Trippie is great!"}
            //     GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Transportation about Trippie","to":"Trippie is great!","updated":[1383534772975]}
            //     */

            //     // run controller
            //     scope.update();
            //     $httpBackend.flush();

            //     // test URL location to new object
            //     expect($location.path()).toBe('/transportations/' + putTransportationData()._id);

            // }));

            // it('$scope.remove() should send a DELETE request with a valid transportationId' +
            //     'and remove the transportation from the scope', inject(function(Transportations) {

            //         // fixture rideshare
            //         var transportation = new Transportations({
            //             _id: '525a8422f6d0f87f0e407a33'
            //         });

            //         // mock rideshares in scope
            //         scope.transportations = [];
            //         scope.transportations.push(transportation);

            //         // test expected rideshare DELETE request
            //         $httpBackend.expectDELETE(/transportations\/([0-9a-fA-F]{24})$/).respond(204);

            //         // run controller
            //         scope.remove(transportation);
            //         $httpBackend.flush();

            //         // test after successful delete URL location transportations lis
            //         //expect($location.path()).toBe('/transportations');
            //         expect(scope.transportations.length).toBe(0);

            //     }));
        });
    });
}());