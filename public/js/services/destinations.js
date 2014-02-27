'use strict';

//Destinations service used for destinations REST endpoint
angular.module('trippie.destinations').factory('Destinations', ['$resource', function($resource) {
    return $resource('destinations/:destinationId', {
        destinationId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);