'use strict';

//Lodgings service used for lodgings REST endpoint
angular.module('trippie.lodgings').factory('Lodgings', ['$resource', function($resource) {
	var url = document.URL;
	var urlArray = url.split('/');
	var tripId = urlArray[urlArray.length-6];
	var destinationId = urlArray[urlArray.length-4];

    return $resource('trips/:tripId/destinations/:destinationId/lodgings', {
        tripId: tripId,
        destinationId: destinationId
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);