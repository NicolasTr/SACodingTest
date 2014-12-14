angular.module('sact').service('AuthenticationService', function(localStorageService) {

    var key = 'authenticationToken';
    var isAuthenticated = function() {
        return localStorageService.get(key) != null;
    };

    return {
        isAuthenticated: isAuthenticated
    };
});
