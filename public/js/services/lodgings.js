'use strict';

//Lodgings service used for lodgings REST endpoint
angular.module('trippie.lodgings').factory('Lodgings', ['$resource', '$routeParams', function($resource, $routeParams) {

    var tripId = $routeParams.tripId;
    var destinationId = $routeParams.destinationId;

    return $resource('trips/:tripId/destinations/:destinationId/lodgings', {
        tripId: tripId,
        destinationId: destinationId
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);