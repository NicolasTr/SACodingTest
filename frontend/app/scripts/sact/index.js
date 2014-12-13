'use strict';

angular.module('sact', [
    'ui.router',
    'LocalStorageModule'
]);

angular.module('sact').config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('sact', {
            templateUrl: 'scripts/sact/partials/sact.html',
            abstract: true
        })
        .state('reference', {
            url: '/reference/',
            templateUrl: 'scripts/sact/partials/reference.html'
        })
        .state('sact.anonymous', {
            templateUrl: 'scripts/sact/partials/sact.anonymous.html',
            abstract: true
        })
        .state('sact.anonymous.login', {
            url: '/login/',
            templateUrl: 'scripts/sact/partials/sact.anonymous.login.html'
        })
        .state('sact.anonymous.register', {
            url: '/register/',
            templateUrl: 'scripts/sact/partials/sact.anonymous.register.html'
        })
        .state('sact.anonymous.logout', {
            url: '/logout/',
            templateUrl: 'scripts/sact/partials/sact.anonymous.login.html'
        })
        .state('sact.authenticated', {
            templateUrl: 'scripts/sact/partials/sact.authenticated.html',
            abstract: true
        })
        .state('sact.authenticated.canvas', {
            url: '/',
            templateUrl: 'scripts/sact/partials/sact.authenticated.canvas.html',
            controller: 'CanvasController'
        });
});

angular.module('sact').config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('sact');
});

angular.module('sact').run(function($rootScope, AuthenticationService, $state) {
    $rootScope
        .$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            if(!AuthenticationService.isAuthenticated()
                && (toState.name.indexOf('sact.anonymous') != 0 && toState.name.indexOf('reference') != 0)) {
                event.preventDefault();
                $state.go('sact.anonymous.login');
            }
        });

    $rootScope
        .$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            console.error('Error changing state: ', toState);
        })
});
