'use strict';

angular.module('trippie.events').controller('EventsController', ['$scope', '$routeParams', '$location', 'Global', 'Events', function ($scope, $routeParams, $location, Global, Events) {
    $scope.global = Global;

    $scope.create = function() {
        var event = new Events({
            name: this.name,
            eventStartDate: this.eventStartDate,
            eventEndDate: this.eventEndDate
        });
        event.$save(function(response) {
            $location.path('trips/' + response._id);
        });

        this.name = '';
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
            $location.path('trips');
        }
    };

    $scope.update = function() {
        var event = $scope.event;
        if (!event.updated) {
            event.updated = [];
        }
        event.updated.push(new Date().getTime());

        event.$update(function() {
            $location.path('trips');
        });
    };

    $scope.find = function() {
        Events.query(function(events) {
            $scope.events = events;
        });
    };

    $scope.findOne = function() {
        Events.get({
            eventId: $routeParams.eventId
        }, function(event) {
            $scope.event = event;
        });
    };
}]);
