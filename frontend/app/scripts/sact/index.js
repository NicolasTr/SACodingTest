'use strict';

angular.module('sact', [
    'ui.router',
    'LocalStorageModule',
    'ngDraggable'
]);

angular.module('sact').config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('reference', {
            url: '/reference/',
            templateUrl: 'scripts/sact/partials/reference.html'
        })
        .state('sact', {
            templateUrl: 'scripts/sact/partials/sact.html',
            abstract: true
        })
        .state('sact.canvas', {
            url: '/',
            templateUrl: 'scripts/sact/partials/sact.canvas.html',
            controller: 'CanvasController'
        })
        .state('sact.gallery', {
            url: '/gallery/',
            templateUrl: 'scripts/sact/partials/sact.gallery.html',
            controller: 'CanvasController'
        });
});

angular.module('sact').config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('sact');
});

angular.module('sact').run(function ($rootScope, $state) {
    $rootScope.$state = $state;
});

// !AuthenticationService.isAuthenticated()
// && toState.name.indexOf('sact.anonymous') != 0 && toState.name.indexOf('reference') != 0
