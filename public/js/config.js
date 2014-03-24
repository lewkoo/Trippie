'use strict';

//Setting up route
angular.module('trippie').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        // *************** Trips *************** 
        when('/trips', {
            templateUrl: 'views/trips/list.html'
        }).
        when('/trips/create', {
            templateUrl: 'views/trips/create.html'
        }).
        when('/trips/:tripId/edit', {
            templateUrl: 'views/trips/edit.html'
        }).
        when('/trips/:tripId', {
            templateUrl: 'views/trips/view.html'
        }).
        // *************** Destinations *************** 
        when('/trips/:tripId/destinations/:destinationId', {
            templateUrl: 'views/destinations/view.html'
        }).
        when('/trips/:tripId/destinations/:destinationId/create', {
            templateUrl: 'views/destinations/create.html'
        }).
        when('/trips/:tripId/destinations/:destinationId/edit', {
            templateUrl: 'views/destinations/edit.html'
        }).
        // *************** Transportations *************** 
        when('/trips/:tripId/transportations/:transportationId/edit', {
            templateUrl: 'views/transportations/edit.html'
        }).
        // *************** Events *************** 
        when('/trips/:tripId/destinations/:destinationId/events', {
            templateUrl: 'views/destinations/view.html'
        }).
        when('/trips/:tripId/destinations/:destinationId/events/:eventId', {
            templateUrl: 'views/destinations/view.html'
        }).
        // *************** Notes *************** 
        when('/trips/:tripId/destinations/:destinationId/notes', {
            templateUrl: 'views/destinations/view.html'
        }).
        when('/trips/:tripId/destinations/:destinationId/notes/:noteId', {
            templateUrl: 'views/destinations/view.html'
        }).
        // *************** Events *************** 
        when('/trips/:tripId/destinations/:destinationId/lodgings', {
            templateUrl: 'views/destinations/view.html'
        }).
        when('/trips/:tripId/destinations/:destinationId/lodgings/:lodgingId', {
            templateUrl: 'views/destinations/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('trippie').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
