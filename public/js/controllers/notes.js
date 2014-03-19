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

        this.name = '';
        this.information = '';
    };

    $scope.remove = function(note) {
        if (confirm('Delete the note titled ' + note.name + '?')) {
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
            else {
                $scope.note.$remove({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId});
                $location.path('notes');
            }
        }
    };

    $scope.update = function() {
        var note = $scope.note;
        if (!note.updated) {
            note.updated = [];
        }
        note.updated.push(new Date().getTime());

        note.$update({tripId: $routeParams.tripId, destinationId: $routeParams.destinationId}, function() {
            $location.path('notes/' + note._id);
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
}]);