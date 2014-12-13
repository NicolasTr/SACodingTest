angular.module('sact').filter('slice', function() {
    // See http://stackoverflow.com/a/14796206
    return function(arr, start, end) {
        return (arr || []).slice(start, end);
    };
})
