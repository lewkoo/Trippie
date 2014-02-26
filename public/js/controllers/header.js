'use strict';

angular.module('trippie.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Trips',
        'link': 'trips'
    }];
    
    $scope.isCollapsed = false;


}]);
