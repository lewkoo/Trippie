'use strict';

//Setting up route
angular.module('trippie').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
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
        // Destinations

        // Transportations
        when('/trips/:tripId/transportations/create', {
            templateUrl: 'views/transportations/create.html'
        }).
        when('/trips/:tripId/transportations/:transportationId/view', {
            templateUrl: 'views/transportations/view.html'
        }).
        when('/trips/:tripId/transportations/:transportationId/edit', {
            templateUrl: 'views/transportations/edit.html'
        }).
        // Events
        when('/destinations/:destinationId/events', {
            templateUrl: 'views/destinations/viewEvents.html'
        }).
        when('/events/create', {
            templateUrl: 'views/events/create.html'
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
