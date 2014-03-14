'use strict';

angular.module('trippie.lodgings').controller('LodgingsController', ['$scope', '$routeParams', '$location', 'Global', 'Lodgings', 'Destinations', 'Trips', function ($scope, $routeParams, $location, Global, Lodgings, Destinations, Trips) {
    $scope.global = Global;

    $scope.create = function() {
        var lodging = new Lodgings({
            name: this.name,
            address: this.address,
            arrivalDate: this.arrivalDate,
            departureDate: this.departureDate,
            information: this.information
        });
        lodging.$save({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function(response) {
            $location.path('lodgings/' + response._id);
        });

        this.name = '';
        this.address = '';
        this.arrivalDate = null;
        this.departureDate = null;
        this.information = '';
    };

    $scope.remove = function(lodging) {
        if (lodging) {
            lodging.$remove({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId});

            for (var i in $scope.lodgings) {
                if ($scope.lodgings[i] === lodging) {
                    $scope.lodgings.splice(i, 1);
                }
            }
        }
        else {
            $scope.lodging.$remove({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId});
            $location.path('lodgings');
        }
    };

    $scope.update = function() {
        var lodging = $scope.lodging;
        if (!lodging.updated) {
            lodging.updated = [];
        }
        lodging.updated.push(new Date().getTime());

        lodging.$update({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function() {
            $location.path('lodgings/' + lodging._id);
        });
    };

    $scope.find = function() {
        Lodgings.query({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function(lodgings) {
            $scope.lodgings = lodgings;
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

        Lodgings.get({
            tripId: $routeParams.tripId,
            destinationId: $routeParams.destinationId,
            lodgingId: $routeParams.lodgingId
        }, function(lodging) {
            $scope.lodging = lodging;
        });
    };
}]);