'use strict';

angular.module('trippie.trips').controller('TripsController', ['$scope', '$routeParams', '$location', 'Global', 'Trips', function ($scope, $routeParams, $location, Global, Trips) {
    $scope.global = Global;

    $scope.today = function() {
        $scope.tripStartDate = new Date();
        $scope.tripEndDate = new Date();

        $scope.minDate = new Date();
    };
    $scope.today();

    $scope.create = function() {

        var trip = new Trips({
            name: this.name,
            tripStartDate: this.tripStartDate.toISOString(),
            tripEndDate: this.tripEndDate.toISOString()
        });
        trip.$save(function(response) {
            
            $location.path('trips/' + response._id);
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

    $scope.update = function() {
        var trip = $scope.trip;
        if (!trip.updated) {
            trip.updated = [];
        }
        trip.updated.push(new Date().getTime());

        trip.$update(function() {
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
