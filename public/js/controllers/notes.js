'use strict';

angular.module('trippie.notes').controller('NotesController', ['$scope', '$routeParams', '$location', '$route', '$modal', 'Global', 'Notes', 'Destinations', 'Trips', function ($scope, $routeParams, $location, $route, $modal, Global, Notes, Destinations, Trips) {
    $scope.global = Global;

    $scope.today = function() {
        $scope.dt = new Date();
        $scope.minDate = new Date();
    };
    $scope.today();

    $scope.create = function() {
        var note = new Notes({
            name: this.name,
            information: this.information
        });
        note.$save({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function() {
            $route.reload();
        });
    };

    $scope.remove = function(note) {
        if (note) {
            Destinations.get({ tripId: $routeParams.tripId, destinationId: $routeParams.destinationId }, function(destination) {
                var noteList = destination.noteIDs;
                var len = noteList.length;
                var i = 0, found = false;
                while(!found && i !== len){
                    var currNoteId = noteList[i]._id;
                    var noteId = note._id;
                    if(currNoteId === noteId){
                        found = true;
                    } else
                        i++;
                }
                if(found) {
                    noteList.splice(i, 1);
                }

                destination.$update({ tripId: $routeParams.tripId }, function () {
                    note.$remove({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId, noteId: note._id });

                    for (var j in $scope.notes) {
                        if ($scope.notes[j] === note) {
                            $scope.notes.splice(i, 1);
                        }
                    }
                });
            });
        }
    };

    $scope.update = function() {
        var note = $scope.note;
        note.$update({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId, noteId: note._id}, function() {
            $route.reload();
        });
    };

    $scope.find = function() {
        
        Notes.query({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function(notes) {
            $scope.notes = notes;
        });
    };

    $scope.findOne = function(id) {
        Notes.get({
            tripId: $routeParams.tripId,
            destinationId: $routeParams.destinationId,
            noteId: id
        }, function(note) {
            $scope.note = note;

            Destinations.get({
                tripId: $routeParams.tripId,
                destinationId: $routeParams.destinationId
            }, function(destination) {
                $scope.destination = destination;

                Trips.get({
                    tripId: $routeParams.tripId
                }, function(trip) {
                    $scope.trip = trip;
                });
            });
        });

    };

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

    $scope.openModalEdit = function(note) {
        $scope.note = note;
        $modal.open({
            templateUrl: 'views/notes/partials/modalEdit.html',
            controller: function ($scope, $modalInstance, note) {
                var noteToUpdate = new Notes({
                    _id: note._id,
                    name: note.name,
                    information: note.information,
                    destinationId: note.destinationId
                });
                $scope.noteToUpdate = noteToUpdate;

                $scope.updateNote = function () {
                    $scope.note = $scope.noteToUpdate;
                    this.update();
                    $modalInstance.close();
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                note: function () {
                    return $scope.note;
                }
            }
        });
    };

}]);