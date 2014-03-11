'use strict';

angular.module('trippie.destinations').controller('DestinationsController', ['$scope', '$routeParams', '$location', 'Global', 'Trips', 'Destinations', 'Transportations', function ($scope, $routeParams, $location, Global, Trips, Destinations, Transportations) {

    $scope.global = Global;

    $scope.create = function() {
        var departTime = new Date();
        var transportation = new Transportations({
            departureTime: departTime.toISOString(),
            information: 'Transportation placeholder'
        });

        $scope.insertAfter = $routeParams.destinationId;

        var destination = new Destinations({
            name: this.name
        });

        var promiseTransSave = transportation.$save({ tripId: $scope.trip._id, destinationId: $scope.destination._id }, function(trans) {
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
                        if(trip.destinationList[i]._id === $scope.insertAfter)
                            found = true;
                        i++;
                    }
                    trip.destinationList.splice(i, 0, $scope.destination);
                    trip.$update({});
                    $location.path('trips/' + $scope.trip._id);
                });
            });
        });
        
        this.name = '';
    };

    $scope.remove = function() {
        Trips.get({ tripId: $routeParams.tripId }, function(trip){
            var len = trip.destinationList.length;
            var i = 0, found = false;
            while(!found && i < len -1){
                console.log(trip.destinationList[i]._id + ' == ' + $routeParams.destinationId);
                if(trip.destinationList[i]._id == $routeParams.destinationId)
                    found = true;
                else
                    i++;
            }
            if(found)
                trip.destinationList.splice(i, 1);
            Destinations.remove({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId});
            console.log(JSON.stringify(trip));
            trip.$update({});
            $location.path('trips/' + $scope.trip._id);
        });
    };

    $scope.update = function() {
        var destination = $scope.destination;
        
        destination.$update({tripId: $scope.trip._id}, function() {
            $location.path('trips/' + $scope.trip._id + '/destinations/' + $scope.destination._id);
        });
    };

    $scope.find = function() {
        Destinations.query(function(destinations) {
            $scope.destinations = destinations;
        });
    };

    $scope.findOne = function() {
        Trips.get({
            tripId: $routeParams.tripId
        }, function(trip) {
            $scope.trip = trip;
        });

        Destinations.get({
            tripId: $routeParams.tripId,
            destinationId: $routeParams.destinationId
        }, function(destination) {
            $scope.destination = destination;
        });
    };
}]);
