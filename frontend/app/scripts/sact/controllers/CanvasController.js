angular.module('sact').controller('CanvasController', function($scope, $modal, $rootScope, $state, AuthenticationService, NotificationService, StoryService, DataService) {
    $scope.isAuthenticated = AuthenticationService.isAuthenticated();

    if(!$scope.isAuthenticated) {
        NotificationService.error('Canvas', 'Please login to access the canvas');
        $state.go('sact.login');
    }

    $scope.scenes = StoryService.getDraft();
    var save = function() {
        StoryService.saveDraft($scope.scenes);
    }

    $scope.$watch('currentScene.description', save);

    $scope.selectScene = function(index) {
        $scope.currentSceneIndex = index;
        $scope.currentScene = $scope.scenes[index];
    }
    $scope.selectScene(0);

    $scope.selectBackground = function(background) {
        $scope.currentScene.background = background;
        console.log('selectBackground');
        save();
    }

    $scope.clearCurrentScene = function() {
        console.log('clearCurrentScene');
        $scope.scenes[$scope.currentSceneIndex] = {description: '', background: {}, positions: []};
        $scope.currentScene = $scope.scenes[$scope.currentSceneIndex];
        save();
    }

    var isComplete = function(scene) {
        return scene.description && scene.background.id && scene.positions.length > 0;
    }

    var isEmpty = function(scene) {
        return !scene.description && !scene.background && scene.positions.length == 0;
    }

    $scope.preview = function() {
        if(!isComplete($scope.scenes[0])) {
            NotificationService.error('Submit', 'Please complete at least scene 1 to preview and submit');
            return
        }

        var nScenes;
        for(nScenes = 1; nScenes <= $scope.scenes.length; nScenes++) {
            if(!isComplete($scope.scenes[nScenes])) {
                if(!isEmpty($scope.scenes[nScenes])) {
                    NotificationService.warning('Submit', 'Scene ' + (nScenes+1) + ' is incomplete');
                }
                break;
            }
        }

        var modalScope = $rootScope.$new();
        modalScope.scenes = $scope.scenes.slice(0, nScenes);
        modalScope.allowSubmit = true;
        $modal.open({
            templateUrl: 'scripts/sact/partials/modal/preview.html',
            size: 'lg',
            scope: modalScope
        }).result.then(function (data) {
            var story = {
                scenes: data
            }
            StoryService.create(story).then(function(data){
                NotificationService.success('Submit', 'Story submitted');
            }, function(errors) {
                NotificationService.error('Submit', 'An error occurred when submitting your story');
            });
        });
    };

    $scope.onDragComplete = function(data, event) {

        console.log($scope.currentScene);

        var newContent = [];
        $scope.currentScene.positions.forEach(function(item) {
            if(item.character.id != data.id) {
                newContent.push(item);
            }
        });

        var scenePosition = $('#mainScene').offset();
        var x = event.x - scenePosition.left - 60;
        var y = event.y - scenePosition.top - 60;
        if(x >= 0 && x < 660 && y >= 0 && y < 330) {
            var positionInScene = {
                x: x > 600 ? 600 : (x < 60 ? 60 : x),
                y: y > 260 ? 260 : (y < 60 ? 60 : y)
            }
            newContent.push({
                x: positionInScene.x,
                y: positionInScene.y,
                character: data
            });
        }

        $scope.currentScene.positions = newContent;
        save();
    };

    $scope.backgrounds = DataService.getBackgrounds();
    $scope.characters = DataService.getCharacters();
});
