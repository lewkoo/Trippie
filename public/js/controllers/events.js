'use strict';

angular.module('trippie.events').controller('EventsController', ['$scope', '$routeParams', '$location', 'Global', 'Trips', 'Destinations', 'Events', function ($scope, $routeParams, $location, Global, Trips, Destinations, Events) {
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
            info: this.information,
            eventStartDate: this.eventStartDate,
            eventEndDate: this.eventEndDate,
            destinationID: $routeParams.destinationId
        });
        var destination = $scope.destination;
        event.$save({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function() {
            destination.eventIDs = event._id;
            destination.$update({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function() {
                $location.path('trips/'+$routeParams.tripId+'/destinations/'+$routeParams.destinationId+'/events');
            });
        });
    };

    $scope.remove = function(event) {
        if (event) {
            event.$remove();

            for (var i in $scope.events) {
                if ($scope.events[i] === event) {
                    $scope.events.splice(i, 1);
                }
            }
        }
        else {
            $scope.event.$remove();
            $location.path('events');
        }
    };

    $scope.update = function() {
        var event = $scope.event;
        if (!event.updated) {
            event.updated = [];
        }
        event.updated.push(new Date().getTime());

        event.$update(function() {
            $location.path('events/' + event._id);
        });
    };

    $scope.find = function() {

        Events.query(function(events) {
            $scope.events = events;
        });
    };

    $scope.findOne = function() {
        Events.get({
            tripId: $routeParams.tripId,
            destinationId: $routeParams.destinationId,
            eventId: $routeParams.eventId
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

}]);
