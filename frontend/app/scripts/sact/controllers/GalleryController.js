angular.module('sact').controller('GalleryController', function($scope, AuthenticationService, $state, NotificationService) {

    $scope.isAuthenticated = AuthenticationService.isAuthenticated();
});
