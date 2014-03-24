'use strict';

angular.module('trippie.transportations').controller('TransportationsController', ['$scope', '$routeParams', '$route', '$modal', '$location', 'Global', 'Transportations', 'Destinations', 'Trips', function ($scope, $routeParams, $route, $modal, $location, Global, Transportations, Destinations, Trips) {
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

        transportation.$update({tripId: $routeParams.tripId, transportationId: transportation._id}, function() {
            $route.reload();
        });
    };

    $scope.find = function() {
        Transportations.query(function(transportations) {
            $scope.transportations = transportations;
        });
    };

    $scope.findOne = function(destinationID) {
        var mTripID = $routeParams.tripId;

        Trips.get({
            tripId: mTripID
        }, function(trip) {
            $scope.trip = trip;

            Destinations.get({
                tripId: $routeParams.tripId,
                destinationId: destinationID
            }, function(destination) {
                $scope.destination = destination;

                if ($scope.destination.outgoingTransportationID) {
                    Transportations.get({
                        tripId: $routeParams.tripId,
                        destinationId: destinationID,
                        transportationId: $scope.destination.outgoingTransportationID._id
                    }, function(transportation) {
                        $scope.transportation = transportation;
                    });
                }
            });
        });
    };

    $scope.openModalEdit = function(transportation) {
        $scope.transportation = transportation;
        $modal.open({
            templateUrl: 'views/transportations/partials/modalEdit.html',
            controller: function ($scope, $modalInstance, transportation) {
                var transportationToUpdate = new Transportations({
                    _id: transportation._id,
                    transportType: transportation.transportType,
                    information: transportation.information,
                    departureTime: transportation.departureTime,
                    arrivalTime: transportation.arrivalTime
                });
                $scope.transportationToUpdate = transportationToUpdate;
                $scope.transportTypeOptions = [{name: 'Bus', value: 'bus', id:'0'}, {name: 'Car', value: 'car', id:'1'},
                    {name: 'Plane', value: 'plane', id:'2'}, {name: 'Train', value: 'train', id:'3'}, {name: 'Other', value:'other', id:'4'}];

                switch (transportationToUpdate.transportType) {
                    case 'bus':
                        $scope.selectedTransportType = $scope.transportTypeOptions[0];
                        break;
                    case 'car':
                        $scope.selectedTransportType = $scope.transportTypeOptions[1];
                        break;
                    case 'plane':
                        $scope.selectedTransportType = $scope.transportTypeOptions[2];
                        break;
                    case 'train':
                        $scope.selectedTransportType = $scope.transportTypeOptions[3];
                        break;
                    default:
                        $scope.selectedTransportType = $scope.transportTypeOptions[4];
                        break;
                }
                
                $scope.updateTransportation = function () {
                    $scope.transportationToUpdate.transportType = $scope.transportationToUpdate.transportType.value;
                    $scope.transportation = $scope.transportationToUpdate;
                    this.update();
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                transportation: function () {
                    return $scope.transportation;
                }
            }
        });
    };
}]);
