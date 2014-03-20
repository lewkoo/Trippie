'use strict';

//Events service used for events REST endpoint
angular.module('trippie.events').factory('Events', ['$resource', function($resource) {
    return $resource('trips/:tripId/destinations/:destinationId/events/:eventId', null,
    {
        update: {
            method: 'PUT'
        }
    });
}]);
