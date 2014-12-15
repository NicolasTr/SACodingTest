angular.module('sact').service('AuthenticationService', function(localStorageService, $http, $q, $timeout) {

    var key = 'authenticationToken';
    var isAuthenticated = function() {
        var value = localStorageService.get(key) != null;
        return value;
    };

    var login = function(user) {
        return $http.post(
            '/api/users/auth/',
            user
        ).then(function(response) {
            localStorageService.set(key, response.data.token);
        }, function(response) {
            throw response.data;
        });
    };

    var logout = function(user) {
        var deferred = $q.defer();
        $timeout(function() {
            localStorageService.remove(key);
            deferred.resolve();
        }, 1500);
        return deferred.promise;
    };

    var register = function(user) {
        return $http.post(
            '/api/users/',
            user
        ).then(function(response) {
            return response.data;
        }, function(response) {
            throw response.data;
        });
    };

    return {
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
        register: register
    };
});
