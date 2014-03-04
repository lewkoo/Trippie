'use strict';

//Transportations service used for transportations REST endpoint
angular.module('trippie.transportations').factory('Transportations', ['$resource', function($resource) {
    return $resource('/transportations/:transportationId', {
        transportationId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);