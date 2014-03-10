'use strict';

//Lodgings service used for lodgings REST endpoint
angular.module('trippie.lodgings').factory('Lodgings', ['$resource', function($resource) {
    return $resource('trips/:tripId/destinations/:destinationId/lodgings/:lodgingId', {
        lodgingId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);