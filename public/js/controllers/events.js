'use strict';

angular.module('trippie.events').controller('EventsController', ['$scope', '$routeParams', '$route', '$modal', '$location', 'Global', 'Trips', 'Destinations', 'Events', function ($scope, $routeParams, $route, $modal, $location, Global, Trips, Destinations, Events) {
    $scope.global = Global;

    $scope.today = function() {
        $scope.minDate = new Date();
        $scope.eventStartDate = new Date();
        $scope.eventEndDate = new Date();
    };
    $scope.today();

    $scope.create = function() {
        var event = new Events({
            name: this.name,
            information: this.information,
            eventStartDate: this.eventStartDate,
            eventEndDate: this.eventEndDate,
            destinationID: $routeParams.destinationId
        });
        event.$save({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function() {
            $route.reload();
        });
    };

    $scope.remove = function(event) {
        if (event) {
            var mTripId = $routeParams.tripId;
            var mDestinationId = $routeParams.destinationId;
            Destinations.get({ tripId: mTripId, destinationId: mDestinationId }, function(destination) {
                var eventList = destination.eventIDs;
                var len = eventList.length;
                var i = 0, found = false;
                while (!found && i < len) {
                    if (eventList[i]._id === event._id || eventList[i] === event._id) {
                        found = true;
                    } else
                        i++;
                }
                if(found) {
                    eventList.splice(i, 1);
                }

                destination.$update({ tripId: mTripId, destinationId: mDestinationId }, function () {
                    for (var j=0; j < $scope.events.length; j++) {
                        if ($scope.events[j] === event) {
                            $scope.events.splice(i, 1);
                        }
                    }
                    event.$remove({tripId: mTripId, destinationId: mDestinationId, eventId: event._id });
                });
            });
        }
    };

    $scope.update = function() {
        var event = $scope.event;
        
        event.$update({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId, eventId: event._id}, function() {
            $route.reload();
        });
    };

    $scope.find = function() {
        Events.query({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function(events) {
            $scope.events = events;
        });
    };

    $scope.findOne = function(id) {
        var mTripId = $routeParams.tripId;
        var mDestinationId = $routeParams.destinationId;
        Events.get({
            tripId: mTripId,
            destinationId: mDestinationId,
            eventId: id
        }, function(event) {
            $scope.event = event;

            Destinations.get({
                tripId: mTripId,
                destinationId: mDestinationId
            }, function(destination) {
                $scope.destination = destination;

                Trips.get({
                    tripId: mTripId
                }, function(trip) {
                    $scope.trip = trip;
                });
            });
        });
    };

    $scope.openModalCreate = function() {
        $modal.open({
            templateUrl: 'views/events/partials/modalCreate.html',
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

    $scope.openModalEdit = function(event) {
        $scope.event = event;
        $modal.open({
            templateUrl: 'views/events/partials/modalEdit.html',
            controller: function ($scope, $modalInstance, event) {
                var eventToUpdate = new Events({
                    _id: event._id,
                    name: event.name,
                    information: event.information,
                    eventStartDate: event.eventStartDate,
                    eventEndDate: event.eventEndDate,
                    destinationID: event.destinationId
                });
                $scope.eventToUpdate = eventToUpdate;
                
                $scope.updateEvent = function () {
                    $scope.event = $scope.eventToUpdate;
                    this.update();
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                event: function () {
                    return $scope.event;
                }
            }
        });
    };

    $scope.viewDetails = function (index) {
        if ($scope.showEventDetails === index)
            $scope.showEventDetails = null;
        else
            $scope.showEventDetails = index;
    };

}]);
