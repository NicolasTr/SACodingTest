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
            templateUrl: 'scripts/sact/partials/states/reference.html'
        })
        .state('sact', {
            templateUrl: 'scripts/sact/partials/states/sact.html',
            abstract: true
        })
        .state('sact.login', {
            templateUrl: 'scripts/sact/partials/states/sact.login.html',
            url: '/login/',
            controller: 'LoginController'
        })
        .state('sact.logout', {
            templateUrl: 'scripts/sact/partials/states/sact.logout.html',
            url: '/logout/',
            controller: 'LogoutController'
        })
        .state('sact.canvas', {
            url: '/canvas/',
            templateUrl: 'scripts/sact/partials/states/sact.canvas.html',
            controller: 'CanvasController'
        })
        .state('sact.gallery', {
            url: '/',
            templateUrl: 'scripts/sact/partials/states/sact.gallery.html',
            controller: 'GalleryController'
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
