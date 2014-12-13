'use strict';

angular.module('app', [
    'sact'
]);

angular.module('app').config(function($locationProvider) {

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

});
