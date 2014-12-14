angular.module('sact').controller('LoginController', function($scope, AuthenticationService, $state, NotificationService) {

    $scope.user = {};
    var setErrors = function(errors) {
        $scope.errors = errors;
    }

    $scope.login = function() {
        return AuthenticationService.login($scope.user).then(function(data) {
            setErrors({});
            NotificationService.success('Login', 'Login successful');
            $state.go('sact.canvas');
        }, setErrors);
    };

    $scope.register = function() {
        return AuthenticationService.register($scope.user).then(function() {
            NotificationService.success('Registration', 'Registration successful');
            return $scope.login();
        }, setErrors);
    }

});
