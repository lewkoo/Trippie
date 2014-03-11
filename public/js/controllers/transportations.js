'use strict';

angular.module('trippie.transportations').controller('TransportationsController', ['$scope', '$routeParams', '$location', 'Global', 'Transportations', 'Destinations', 'Trips', function ($scope, $routeParams, $location, Global, Transportations, Destinations, Trips) {
    $scope.global = Global;

    $scope.create = function() {
        var transportation = new Transportations({
            transportType: this.transportType,
            information: this.information,
            departureTime: this.departureTime,
            arrivalTime: this.arrivalTime
        });

        transportation.$save(function(response) {
            $location.path('transportations/' + response._id);
        });

        this.transportType = '';
        this.information = '';
        this.departureTime = null;
        this.arrivalTime = null;
    };

    $scope.remove = function(transportation) {
        if (transportation) {
            transportation.$remove();

            for (var i in $scope.transportations) {
                if ($scope.transportations[i] === transportation) {
                    $scope.transportations.splice(i, 1);
                }
            }
        }
        else {
            $scope.transportation.$remove();
            $location.path('transportations');
        }
    };

    $scope.update = function() {
        var transportation = $scope.transportation;
        if (!transportation.updated) {
            transportation.updated = [];
        }
        transportation.updated.push(new Date().getTime());

        transportation.$update(function() {
            $location.path('transportations/' + $scope.transportation._id);
        });
    };

    $scope.find = function() {
        Transportations.query(function(transportations) {
            $scope.transportations = transportations;
        });
    };

    $scope.findOne = function() {
        Transportations.get({
            tripId: $routeParams.tripId,
            destinationId: $routeParams.destinationId,
            transportationId: $routeParams.transportationId
        }, function(transportation) {
            $scope.transportation = transportation;

            Destinations.get({
                tripId: $routeParams.tripId,
                destinationId: $routeParams.destinationId
            }, function(destination) {
                $scope.destination = destination;

                Trips.get({
                    tripId: $routeParams.tripId
                }, function(trip) {
                    $scope.trip = trip;
                });
            });
        });
    };
}]);
