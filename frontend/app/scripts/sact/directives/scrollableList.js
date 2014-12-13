angular.module('sact').directive('scrollableList', function() {
    return {
        restrict: 'E',
        scope: {
            items: '=',
            max: '=',
            clickHandler: '='
        },
        templateUrl: 'scripts/sact/partials/directives/scrollable-list.html',
        link: function(scope, element, attrs) {

            var update = function() {
                scope.currentPosition = 0;
                scope.hasMore = scope.max > scope.items.length;
            };

            scope.$watch('items', update);
            scope.$watch('max', update);

            scope.up = function() {
                scope.currentPosition += scope.currentPosition + 1 >= scope.items.length - scope.max + 1 ? 0 : 1;
            };
            scope.down = function() {
                scope.currentPosition -= scope.currentPosition - 1 >= 0 ? 1 : 0;
            };
        }
    };
});
