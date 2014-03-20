'use strict';

angular.module('trippie.events').controller('EventsController', ['$scope', '$routeParams', '$route', '$modal', '$location', 'Global', 'Trips', 'Destinations', 'Events', function ($scope, $routeParams, $route, $modal, $location, Global, Trips, Destinations, Events) {
    $scope.global = Global;

    $scope.today = function() {
        $scope.eventStartDate = new Date();
        $scope.eventEndDate = new Date();
        $scope.minDate = new Date();
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
            Destinations.get({ tripId: $routeParams.tripId, destinationId: $routeParams.destinationId }, function(destination) {
                var eventList = destination.eventIDs;
                var len = eventList.length;
                var i = 0, found = false;
                while(!found && i !== len){
                    var currEventId = eventList[i]._id;
                    var eventId = event._id;
                    if(currEventId === eventId){
                        found = true;
                    } else
                        i++;
                }
                if(found) {
                    eventList.splice(i, 1);
                }

                destination.$update({ tripId: $routeParams.tripId }, function () {
                    event.$remove({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId, eventId: event._id });

                    for (var j in $scope.events) {
                        if ($scope.events[j] === event) {
                            $scope.events.splice(i, 1);
                        }
                    }
                });
            });
        }
        else {
            $scope.event.$remove({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId});
            $location.path('events');
        }
    };

    $scope.update = function() {
        var event = $scope.event;
        if (!event.updated) {
            event.updated = [];
        }
        event.updated.push(new Date().getTime());

        event.$update({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function() {
            $location.path('events/' + event._id);
        });
    };

    $scope.find = function() {
        Events.query({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function(events) {
            $scope.events = events;
        });
    };

    $scope.findOne = function(id) {
        Events.get({
            tripId: $routeParams.tripId,
            destinationId: $routeParams.destinationId,
            eventId: id
        }, function(event) {
            $scope.event = event;

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

    $scope.viewDetails = function (index) {
        if ($scope.showEventDetails === index)
            $scope.showEventDetails = null;
        else
            $scope.showEventDetails = index;
    };

}]);
