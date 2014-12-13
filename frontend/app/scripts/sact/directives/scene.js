angular.module('sact').directive('scene', function() {
    return {
        restrict: 'E',
        scope: {
            scene: '='
        },
        templateUrl: 'scripts/sact/partials/directives/scene.html',
        link: function(scope, element, attrs) {

            var update = function() {
                var url;
                if(!scope.scene.background) {
                    url = '';
                } else {
                    url = scope.scene.background.url;
                }
                element.css({
                    'background-image': 'url(' + url +')'
                });
            };

            scope.$watch('scene.background.url', update);

        }
    };
});
