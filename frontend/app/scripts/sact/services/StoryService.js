angular.module('sact').service('StoryService', function($http, localStorageService, AuthenticationService) {

    var create = function(story) {
        var config = {
            headers: {
                'Authorization': 'JWT ' + AuthenticationService.getToken()
            }
        };

        // Copy
        var newStory = angular.fromJson(angular.toJson(story));
        for(var i = 0; i < newStory.scenes.length; i++) {
            newStory.scenes[i].background = newStory.scenes[i].background.id;
            for(var j = 0; j < newStory.scenes[i].positions.length; j++) {
                newStory.scenes[i].positions[j].character = newStory.scenes[i].positions[j].character.id;
            }
        }

        return $http.post('/api/stories/', newStory, config).then(function(response) {
            return response.data;
        }, function(response) {
            throw response.data;
        });
    };

    var list = function () {
        return $http.get('/api/gallery/').then(function(response) {
            var stories = response.data;
            for(var i = 0; i < stories.length; i++) {
                stories[i].scenes = stories[i].scenes.reverse()
            }
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
                {description: '', background: {}, positions: []},
                {description: '', background: {}, positions: []},
                {description: '', background: {}, positions: []},
                {description: '', background: {}, positions: []}
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
