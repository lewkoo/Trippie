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
