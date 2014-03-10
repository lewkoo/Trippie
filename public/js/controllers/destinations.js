'use strict';

angular.module('trippie.destinations').controller('DestinationsController', ['$scope', '$routeParams', '$location', 'Global', 'Trips', 'Destinations', 'Events', function ($scope, $routeParams, $location, Global, Trips, Destinations, Events) {
    $scope.global = Global;
 
    $scope.today = function() {
        $scope.eventStartDate = new Date();
        $scope.eventEndDate = new Date();

        $scope.minDate = new Date();
    };
    $scope.today();


    $scope.create = function() {
        var destination = new Destinations({
            name: this.name
        });

        destination.$save(function() {
            $location.path('trips/' + $scope.trip._id);
        });

        this.name = '';
    };

    $scope.createEvent = function() {
        var destination = $scope.destination;
        var event = new Events({
            name: this.name,
            eventStartDate: this.eventStartDate.toISOString(),
            eventEndDate: this.eventEndDate.toISOString(),
            destinationID: $scope.destination._id
        });
        event.$save(function(){
            destination.eventIDs = event._id;
            destination.$update(function() {
                $location.path('trips/' + $scope.trip._id);
            });
        });
    };

    $scope.remove = function(destination) {
        if (destination) {
            destination.$remove();

            for (var i in $scope.destinations) {
                if ($scope.destinations[i] === destination) {
                    $scope.destinations.splice(i, 1);
                }
            }
        }
        else {
            $scope.destination.$remove();
            $location.path('trips/' + $scope.trip._id);
        }
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
