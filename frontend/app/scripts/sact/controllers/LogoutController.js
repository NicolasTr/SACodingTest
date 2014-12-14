angular.module('sact').controller('LogoutController', function(AuthenticationService, $state, NotificationService) {

    AuthenticationService.logout().then(function(){
        NotificationService.success('Logout', 'Logout successful');
        $state.go('sact.gallery');
    }, function() {
        NotificationService.error('Logout', 'Unable to logout');
    })

});
