'use strict';

angular.module('trippie.destinations').controller('DestinationsController', ['$scope', '$routeParams', '$route', '$modal', '$location', 'Global', 'Trips', 'Destinations', 'Transportations', function ($scope, $routeParams, $route, $modal, $location, Global, Trips, Destinations, Transportations) {

    $scope.global = Global;

    $scope.create = function() {
        var departTime = new Date();
        departTime.setMinutes(0);
        departTime.setSeconds(0);
        departTime.setMilliseconds(0);
        var transportation = new Transportations({
            departureTime: departTime.toISOString(),
            transportType: 'other'
        });

        var destination = new Destinations({
            name: this.name
        });

        $scope.insertAfter = $scope.insertAfterDest._id;

        var promiseTransSave = transportation.$save({ tripId: $scope.trip._id }, function(trans) {
            $scope.transportation = trans;
        });

        promiseTransSave.then(function() {
            destination.outgoingTransportationID = $scope.transportation._id;
            
            var promiseDestSave = destination.$save({ tripId: $scope.trip._id }, function(dest){
                $scope.destination = dest;
            });

            promiseDestSave.then(function() {
                Trips.get({ tripId: $scope.trip._id }, function(trip){
                    var len = trip.destinationList.length;
                    var i = 0, found = false;
                    while(!found && i < len){
                        if(trip.destinationList[i]._id === $scope.insertAfter || trip.destinationList[i] === $scope.insertAfter)
                            found = true;
                        i++;
                    }
                    trip.destinationList.splice(i, 0, $scope.destination);
                    trip.$update(function(trip) {
                        $scope.trip = trip;
                    });
                    $route.reload();
                });
            });
        });
    };

    $scope.remove = function() {
        Trips.get({ tripId: $routeParams.tripId }, function(trip){
            var len = trip.destinationList.length;
            var i = 0, found = false;
            while(!found && i < len -1){
                if(trip.destinationList[i]._id === $routeParams.destinationId || trip.destinationList[i] === $routeParams.destinationId)
                    found = true;
                else
                    i++;
            }
            if(found)
                trip.destinationList.splice(i, 1);
            Destinations.remove({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function(){
                trip.$update(function(trip) {
                    $scope.trip = trip;
                });
            });
            $location.path('trips/' + $scope.trip._id);
        });
    };

    $scope.update = function() {
        var destination = $scope.destination;
        
        destination.$update({tripId: $scope.trip._id}, function() {
            $route.reload();
        });
    };

    $scope.findOne = function() {
        Trips.get({
            tripId: $routeParams.tripId
        }, function(trip) {
            $scope.trip = trip;
            Destinations.get({
                tripId: $routeParams.tripId,
                destinationId: $routeParams.destinationId
            }, function(destination) {
                $scope.destination = destination;
            });
        });
    };

    $scope.openModalCreate = function(insertAfterDestination) {
        $modal.open({
            templateUrl: 'views/destinations/partials/modalCreate.html',
            controller: function ($scope, $modalInstance, destination, trip) {
                $scope.save = function () {
                    $scope.insertAfterDest = destination;
                    $scope.destination = destination;
                    $scope.trip = trip;
                    this.create();
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                destination: function () {
                    return insertAfterDestination;
                },
                trip: function () {
                    return $scope.trip;
                }
            }
        });
    };

    $scope.openModalEdit = function(destination) {
        $modal.open({
            templateUrl: 'views/destinations/partials/modalEdit.html',
            controller: function ($scope, $modalInstance, destination, trip) {
                var destinationToUpdate = new Destinations({
                    _id: destination._id,
                    name: destination.name,
                    outgoingTransportationID: destination.outgoingTransportationID,
                    eventIDs: destination.eventIDs,
                    lodgingIDs: destination.lodgingIDs,
                    noteIDs: destination.noteIDs
                });
                $scope.destinationToUpdate = destinationToUpdate;
                
                $scope.updateDestination = function () {
                    $scope.trip = trip;
                    $scope.destination = $scope.destinationToUpdate;
                    this.update();
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                destination: function () {
                    return destination;
                },
                trip: function () {
                    return $scope.trip;
                }
            }
        });
    };
}]);
