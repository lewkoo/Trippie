'use strict';

(function() {
    // Notes Controller Spec
    describe('Trippie controllers', function() {
        describe('NotesController', function() {
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
            var NotesController,
                scope,
                $httpBackend,
                $routeParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$routeParams_, _$httpBackend_, Notes, Destinations, Trips) {

                scope = $rootScope.$new();

                $routeParams = _$routeParams_;
                $routeParams.tripId = '525a8422f6d0f87f0e000000';
                $routeParams.destinationId = '525a8422f6d0f87f0e000001';

                NotesController = $controller('NotesController', {
                    $scope: scope
                });

                scope.noteId = '525a8422f6d0f87f0e000003';
                scope.noteName = 'Test Note1';
                scope.noteInformation = 'Test Note Information';

                scope.destName = 'Test Destination';
                scope.destinationId = '525a8422f6d0f87f0e000001';
                scope.tripName = 'Test Trip';
                scope.tripId = '525a8422f6d0f87f0e000000';
                scope.destinationList = [scope.destinationId];

                var note = new Notes({
                    name: scope.destName,
                    information: scope.noteInformation,
                    destinationId: $routeParams.destinationId
                });
                note._id = scope.noteId;
                scope.note = note;
                scope.notes = [scope.note];

                var destination = new Destinations({
                    name: scope.destName,
                    noteIDs: [scope.noteId]
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

                $location.url('/trips/' + scope.tripId + '/destinations/' + scope.destinationId);
            }));

            it('$scope.find() should create an array with at least one note object ' +
                'fetched from XHR', function() {

                    // test expected GET request
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})\/notes$/).respond([{
                        _id: scope.noteId,
                        name: scope.destName,
                        information: scope.noteInformation,
                        destinationId: $routeParams.destinationId
                    }]);
                    $httpBackend.expectGET('views/destinations/view.html').respond(200);

                    // run controller
                    scope.find();
                    $httpBackend.flush();

                    // test scope value
                    expect(scope.notes).toEqualData([{
                        _id: scope.noteId,
                        name: scope.destName,
                        information: scope.noteInformation,
                        destinationId: scope.destinationId
                    }]);

                });

            it('$scope.findOne() should create an array with one note object fetched ' +
                'from XHR using a noteId URL parameter', function() {

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
                    var responseNoteData = {
                            _id: scope.noteId,
                            name: 'Soccer',
                            information: 'Where to play'
                        };

                    // remove the trip, destination, and note
                    scope.trip = {};
                    scope.destination = {};
                    scope.note = {};

                    // test expected GET request with response object
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})\/notes\/([0-9a-fA-F]{24})$/).respond(responseNoteData);
                    $httpBackend.expectGET('views/destinations/view.html').respond(200);
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})$/).respond(responseDestinationData);
                    $httpBackend.expectGET(/trips\/([0-9a-fA-F]{24})$/).respond(responseTripData);

                    // run controller
                    scope.findOne(scope.noteId);
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
                    expect(scope.note).toEqualData({
                        _id: scope.noteId,
                        name: 'Soccer',
                        information: 'Where to play'
                    });

                });

            it('$scope.update() should update a valid note', function() {

                var date = new Date();

                scope.note._id = scope.noteId;
                scope.note.name = 'Soccer';
                scope.note.information = 'Bring a ball';
                scope.note.destinationId = scope.destinationId;

                // expected PUT data
                var putNoteData = {
                    name:'Soccer',
                    information:'Bring a ball',
                    destinationId:'525a8422f6d0f87f0e000001',
                    _id:'525a8422f6d0f87f0e000003'
                };

                // expected response data
                var responseNoteData = {
                        name: 'Soccer',
                        information: 'Bring a ball',
                        destinationId: scope.destinationId,
                        _id: scope.noteId
                    };

                // test PUT happens correctly
                $httpBackend.expectPUT(/trips\/([0-9a-fA-F]{24})\/destinations\/([0-9a-fA-F]{24})\/notes\/([0-9a-fA-F]{24})$/, scope.note).respond(responseNoteData);
                $httpBackend.expectGET('views/destinations/view.html').respond(200);
                
                // run controller
                scope.update();
                $httpBackend.flush();

            });
        });
    });
}());
