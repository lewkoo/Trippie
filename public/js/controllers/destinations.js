'use strict';

angular.module('trippie.destinations').controller('DestinationsController', ['$scope', '$routeParams', '$location', 'Global', 'Destinations', function ($scope, $routeParams, $location, Global, Destinations) {
    $scope.global = Global;

    $scope.create = function() {
        var destination = new Destinations({
            name: this.name
        });
        destination.$save(function(response) {
            $location.path('trips/' + response._id);
        });

        this.name = '';
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
            $location.path('trips');
        }
    };

    $scope.update = function() {
        var destination = $scope.destination;
        if (!destination.updated) {
            destination.updated = [];
        }
        destination.updated.push(new Date().getTime());

        destination.$update(function() {
            $location.path('trips');
        });
    };

    $scope.find = function() {
        Destinations.query(function(destinations) {
            $scope.destinations = destinations;
        });
    };

    $scope.findOne = function() {
        Destinations.get({
            destinationId: $routeParams.destinationId
        }, function(destination) {
            $scope.destination = destination;
        });
    };
}]);
