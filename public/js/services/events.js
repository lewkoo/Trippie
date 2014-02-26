'use strict';

//Events service used for events REST endpoint
angular.module('trippie.events').factory('Events', ['$resource', function($resource) {
    return $resource('events/:eventId', {
        eventId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
