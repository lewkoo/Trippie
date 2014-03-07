'use strict';

//Events service used for events REST endpoint
angular.module('trippie.destinations').factory('Events', ['$resource', function($resource) {
    return $resource('trips/:tripId/destinations/:destinationId/events', {
        destinationId: '@destinationId'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
