'use strict';

//Events service used for events REST endpoint
angular.module('trippie.destinations').factory('Destinations', ['$resource', function($resource) {
    return $resource('trips/:tripId/destinations/:destinationId/events', {
        destinationId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
