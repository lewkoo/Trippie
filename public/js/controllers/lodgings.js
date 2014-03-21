'use strict';

angular.module('trippie.lodgings').controller('LodgingsController', ['$scope', '$routeParams', '$location', '$route', '$modal', 'Global', 'Lodgings', 'Destinations', 'Trips', function ($scope, $routeParams, $location, $route, $modal, Global, Lodgings, Destinations, Trips) {
    $scope.global = Global;

    $scope.create = function() {
        var lodging = new Lodgings({
            name: this.name,
            address: this.address,
            arrivalDate: this.arrivalDate,
            departureDate: this.departureDate,
            information: this.information
        });
        lodging.$save({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function() {
            $route.reload();
        });

        this.name = '';
        this.address = '';
        this.arrivalDate = null;
        this.departureDate = null;
        this.information = '';
    };

    $scope.remove = function(lodging) {
        if (lodging) {
            Destinations.get({ tripId: $routeParams.tripId, destinationId: $routeParams.destinationId }, function(destination) {
                var lodgingList = destination.lodgingIDs;
                var len = lodgingList.length;
                var i = 0, found = false;
                while(!found && i !== len){
                    var currNoteId = lodgingList[i]._id;
                    var lodgingId = lodging._id;
                    if(currNoteId === lodgingId){
                        found = true;
                    } else
                        i++;
                }
                if(found) {
                    lodgingList.splice(i, 1);
                }

                destination.$update({ tripId: $routeParams.tripId }, function () {
                    lodging.$remove({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId, lodgingId: lodging._id });

                    for (var j in $scope.lodgings) {
                        if ($scope.lodgings[j] === lodging) {
                            $scope.lodgings.splice(i, 1);
                        }
                    }
                });
            });
        }
    };

    $scope.update = function() {
        var lodging = $scope.lodging;

        lodging.$update({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId, lodgingId: lodging._id}, function() {
            $route.reload();
        });
    };

    $scope.find = function() {
        Lodgings.query({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function(lodgings) {
            $scope.lodgings = lodgings;
        });
    };

    $scope.findOne = function() {
        Lodgings.get({
            tripId: $routeParams.tripId,
            destinationId: $routeParams.destinationId,
            lodgingId: $routeParams.lodgingId
        }, function(lodging) {
            $scope.lodging = lodging;

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

    $scope.openModalCreate = function() {
        $modal.open({
            templateUrl: 'views/lodgings/partials/modalCreate.html',
            controller: function ($scope, $modalInstance) {
                $scope.save = function () {
                    this.create();
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
    };

    $scope.openModalEdit = function(lodging) {
        $scope.lodging = lodging;
        $modal.open({
            templateUrl: 'views/lodgings/partials/modalEdit.html',
            controller: function ($scope, $modalInstance, lodging) {
                var lodgingToUpdate = new Lodgings({
                    _id: lodging._id,
                    name: lodging.name,
                    address: lodging.address,
                    information: lodging.information,
                    arrivalDate: lodging.arrivalDate,
                    departureDate: lodging.departureDate
                });
                $scope.lodgingToUpdate = lodgingToUpdate;
                
                $scope.updateLodging = function () {
                    $scope.lodging = $scope.lodgingToUpdate;
                    this.update();
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                lodging: function () {
                    return $scope.lodging;
                }
            }
        });
    };

    $scope.viewDetails = function (index) {
        if ($scope.showLodgingDetails === index)
            $scope.showLodgingDetails = null;
        else
            $scope.showLodgingDetails = index;
    };
    
}]);