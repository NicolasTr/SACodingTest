angular.module('sact').controller('GalleryController', function($scope, AuthenticationService, $state, NotificationService, StoryService, $rootScope, $modal) {
    $scope.isAuthenticated = AuthenticationService.isAuthenticated();

    $scope.stories = [];
    StoryService.list().then(function(stories){
        $scope.stories = stories;
    }, function(error) {
        NotificationService.success('Gallery', 'An error occurred when retrieving the stories.');
    })

    $scope.preview = function(story) {
        var modalScope = $rootScope.$new();
        modalScope.scenes = story.scenes;
        modalScope.allowSubmit = false;
        $modal.open({
            templateUrl: 'scripts/sact/partials/modal/preview.html',
            size: 'lg',
            scope: modalScope
        })
    }
});
