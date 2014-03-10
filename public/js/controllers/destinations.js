'use strict';

angular.module('trippie.destinations').controller('DestinationsController', ['$scope', '$routeParams', '$location', 'Global', 'Trips', 'Destinations', 'Events', 'Transportations', function ($scope, $routeParams, $location, Global, Trips, Destinations, Events, Transportations) {

    $scope.global = Global;
 
    $scope.today = function() {
        $scope.eventStartDate = new Date();
        $scope.eventEndDate = new Date();

        $scope.minDate = new Date();
    };
    $scope.today();


    $scope.create = function() {
        var departTime = new Date();

        $scope.insertAfter = $routeParams.destinationId;

        var destination = new Destinations({
            name: this.name
        });

        var promiseDestSave = destination.$save({ tripId: $routeParams.tripId }, function(dest){
            $scope.destination = dest;
        });
        promiseDestSave.then(function(response) {
            Trips.get({ tripId: $routeParams.tripId }, function(trip){
                var len = trip.destinationList.length;
                var i = 0, found = false;
                while(!found && i < len){
                    if(trip.destinationList[i]._id == $scope.insertAfter)
                        found = true;
                    i++;
                }
                trip.destinationList.splice(i, 0, $scope.destination);
                trip.$update();
                $location.path('trips/' + $scope.trip._id);
            });
        });

        this.name = '';
    };

    $scope.createEvent = function() {
        var destination = $scope.destination;
        var event = new Events({
            name: this.name,
            eventStartDate: this.eventStartDate.toISOString(),
            eventEndDate: this.eventEndDate.toISOString()
        });
        event.$save(function(){
            destination.$update({eventId: event}, function() {
                $location.path('/trips');
            });
        });
    };

    $scope.remove = function() {
        Trips.get({ tripId: $routeParams.tripId }, function(trip){
            var len = trip.destinationList.length;
            var i = 0, found = false;
            while(!found && i < len -1){
                if(trip.destinationList[i]._id == $scope.destination._id) 
                    found = true;
                else
                    i++;
	    }
            if(found) 
                trip.destinationList.splice(i, 1);
            $scope.destination.$remove({tripId: $routeParams.tripId});
            trip.$update({tripId: $routeParams.tripId});
            $location.path('trips/' + $scope.trip._id);
        });
    };

    $scope.update = function() {
        var destination = $scope.destination;
        
        destination.$update({tripId: $scope.trip._id}, function() {
            $location.path('trips/' + $scope.trip._id + '/destinations/' + $scope.destination._id);
        });
    };

    $scope.find = function() {
        Destinations.query(function(destinations) {
            $scope.destinations = destinations;
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
    };
}]);
