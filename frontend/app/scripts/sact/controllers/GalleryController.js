angular.module('sact').controller('GalleryController', function($scope, AuthenticationService, $state, NotificationService, StoryService) {
    $scope.isAuthenticated = AuthenticationService.isAuthenticated();

    $scope.stories = [];
    StoryService.list().then(function(stories){
        $scope.stories = stories;
    }, function(error) {
        NotificationService.success('Gallery', 'An error occurred when retrieving the stories.');
    })
});
