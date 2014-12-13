'use strict';

angular.module('sact', [
    'ui.router'
]);

angular.module('sact').config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('sact', {
            templateUrl: 'scripts/sact/partials/sact.html',
            abstract: true
        })
        .state('sact.reference', {
            url: '/reference/',
            templateUrl: 'scripts/sact/partials/sact.reference.html'
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
