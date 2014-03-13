'use strict';

//Events service used for events REST endpoint
angular.module('trippie.notes').factory('Notes', ['$resource', '$routeParams', function($resource, $routeParams) {

    var tripId = $routeParams.tripId;
    var destinationId = $routeParams.destinationId;

    return $resource('trips/:tripId/destinations/:destinationId/notes', {
        tripId: tripId,
        destinationId: destinationId
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
