'use strict';

angular.module('trippie.transportations').controller('TransportationsController', ['$scope', '$routeParams', '$location', 'Global', 'Transportations', function ($scope, $routeParams, $location, Global, Transportations) {
    $scope.global = Global;

    $scope.create = function() {
        var transportation = new Transportations({
            name: this.name
        });
        transportation.$save(function(response) {
            $location.path('trips/' + response._id);
        });

        this.name = '';
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
            $location.path('trips');
        }
    };

    $scope.update = function() {
        var transportation = $scope.transportation;
        if (!transportation.updated) {
            transportation.updated = [];
        }
        transportation.updated.push(new Date().getTime());

        transportation.$update(function() {
            $location.path('trips');
        });
    };

    $scope.find = function() {
        Transportations.query(function(transportations) {
            $scope.transportations = transportations;
        });
    };

    $scope.findOne = function() {
        Transportations.get({
            transportationId: $routeParams.transportationId
        }, function(transportation) {
            $scope.transportation = transportation;
        });
    };
}]);
