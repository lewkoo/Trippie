'use strict';

angular.module('trippie.notes').controller('NotesController', ['$scope', '$routeParams', '$location', '$route', '$modal', 'Global', 'Notes', function ($scope, $routeParams, $location, $route, $modal, Global, Notes) {
    $scope.global = Global;

    $scope.today = function() {
        $scope.dt = new Date();
        $scope.minDate = new Date();
    };
    $scope.today();

    $scope.create = function() {

        // console.log(this.dt);
        // console.log(this.dt.getUTCDate());
        // console.log(this.dt.toISOString());

        var note = new Notes({
            name: this.name,
            information: this.information
        });
        note.$save(function() {
            $route.reload();
        });

        this.name = '';
        this.information = '';
    };

    // $scope.remove = function(event) {
    //     // if (event) {
    //     //     event.$remove();

    //     //     for (var i in $scope.events) {
    //     //         if ($scope.events[i] === event) {
    //     //             $scope.events.splice(i, 1);
    //     //         }
    //     //     }
    //     // }
    //     // else {
    //     //     $scope.event.$remove();
    //     //     $location.path('events');
    //     // }
    // };

    // $scope.update = function() {
    //     // var event = $scope.event;
    //     // if (!event.updated) {
    //     //     event.updated = [];
    //     // }
    //     // event.updated.push(new Date().getTime());

    //     // event.$update(function() {
    //     //     $location.path('events/' + event._id);
    //     // });
    // };

    $scope.find = function() {
        
        Notes.query(function(notes) {
            $scope.notes = notes;
        });
    };

    // $scope.findOne = function() {
    //     // Events.get({
    //     //     eventId: $routeParams.eventId
    //     // }, function(event) {
    //     //     $scope.event = event;
    //     // });
    // };

    $scope.openModalCreate = function() {
        $modal.open({
            templateUrl: 'views/notes/partials/modalCreate.html',
            controller: function ($scope, $modalInstance) {
                $scope.save = function () {
                    this.create();
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
    };
}]);