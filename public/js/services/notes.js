'use strict';

//Events service used for events REST endpoint
angular.module('trippie.notes').factory('Notes', ['$resource', function($resource) {
	var url = document.URL;
	var urlArray = url.split('/');
	var tripId = urlArray[urlArray.length-4];
	var destinationId = urlArray[urlArray.length-2];

    return $resource('trips/:tripId/destinations/:destinationId/notes', {
        tripId: tripId,
        destinationId: destinationId
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
