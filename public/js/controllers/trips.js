'use strict';

angular.module('trippie.trips').controller('TripsController', ['$scope', '$routeParams', '$location', 'Global', 'Trips', 'Destinations', function ($scope, $routeParams, $location, Global, Trips, Destinations) {
    $scope.global = Global;

    $scope.today = function() {
        var date = new Date();
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        $scope.tripStartDate = date;
        $scope.tripEndDate = date;
        $scope.minDate = date;
    };
    $scope.today();

    $scope.create = function() {
        var trip = new Trips({
            name: this.name,
            tripStartDate: this.tripStartDate.toISOString(),
            tripEndDate: this.tripEndDate.toISOString()
        });

        trip.$save(function(trip) {
            $scope.trip = trip;
            $location.path('trips/' + trip._id);
        });

        //clear the variables
        this.name = '';
        this.tripStartDate = null;
        this.tripEndDate = null;
    };

    $scope.remove = function(trip) {
        if (trip) {
            trip.$remove();

            for (var i in $scope.trips) {
                if ($scope.trips[i] === trip) {
                    $scope.trips.splice(i, 1);
                }
            }
        }
        else {
            $scope.trip.$remove(function() {
                $location.path('trips');
            });
        }
    };

    $scope.removeDestination = function(index) {
        var destination = $scope.trip.destinationList[index];
        $scope.trip.destinationList.splice(index, 1);
        var destId = destination._id ? destination._id : destination;
        Destinations.remove({tripId: $routeParams.tripId, destinationId: destId}, function(){
            $scope.trip.$update(function(trip){
                $scope.trip = trip;
            });
        });
        $location.path('trips/' + $routeParams.tripId);
    };

    $scope.update = function() {
        var trip = $scope.trip;

        trip.$update(function(trip) {
            $scope.trip = trip;
            $location.path('trips/' + trip._id);
        });
    };

    $scope.find = function() {
        Trips.query(function(trips) {
            $scope.trips = trips;
        });
    };

    $scope.findOne = function() {
        Trips.get({
            tripId: $routeParams.tripId
        }, function(trip) {
            $scope.trip = trip;
        });
    };

}]);