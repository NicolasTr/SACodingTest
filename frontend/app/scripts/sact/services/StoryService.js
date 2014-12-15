angular.module('sact').service('StoryService', function($http, localStorageService) {

    var create = function(story) {
        return $http.get('/api/stories/', story).then(function(response) {
            return response.data;
        }, function(response) {
            throw response.data;
        });
    };

    var list = function () {
        return $http.get('/api/stories/').then(function(response) {
            return response.data;
        }, function(response) {
            throw response.data;
        });
    };

    var key = 'draft';
    var saveDraft = function(draft) {
        localStorageService.set(key, angular.toJson(draft));
    }

    var getDraft = function() {
        var draft = localStorageService.get(key);
        if(draft != null) {
            return draft;
        } else {
            return [
                {description: '', background: {}, content: []},
                {description: '', background: {}, content: []},
                {description: '', background: {}, content: []},
                {description: '', background: {}, content: []}
            ];
        }
    }

    return {
        create: create,
        list: list,
        saveDraft: saveDraft,
        getDraft: getDraft
    };
});
