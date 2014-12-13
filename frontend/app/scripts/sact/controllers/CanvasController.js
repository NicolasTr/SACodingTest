angular.module('sact').controller('CanvasController', function($scope) {

    $scope.scenes = [
        {},
        {},
        {},
        {}
    ]
    $scope.selectScene = function(index) {
        console.log('selectScene', index);
        $scope.currentScene = index;
    }
    $scope.selectScene(0);

    $scope.selectBackground = function(background) {
        console.log('selectBackground', background.id);
        $scope.scenes[$scope.currentScene].background = background;
    }
    $scope.selectBackground(0);

    $scope.backgrounds = [
        {id: 1, url: 'images/backgrounds/1.jpg'},
        {id: 2, url: 'images/backgrounds/2.jpg'},
        {id: 3, url: 'images/backgrounds/3.jpg'},
        {id: 4, url: 'images/backgrounds/4.jpg'},
        {id: 5, url: 'images/backgrounds/5.jpg'},
        {id: 6, url: 'images/backgrounds/6.jpg'},
        {id: 7, url: 'images/backgrounds/7.jpg'},
        {id: 8, url: 'images/backgrounds/8.jpg'},
        {id: 9, url: 'images/backgrounds/9.jpg'}
    ]

    $scope.characters = [
        {id: 1, url: 'images/vendor/images/chars/Barbosa.png'},
        {id: 2, url: 'images/vendor/images/chars/Bob_Flying.png'},
        {id: 3, url: 'images/vendor/images/chars/Buzz.png'},
        {id: 4, url: 'images/vendor/images/chars/CaptainJack.png'},
        {id: 5, url: 'images/vendor/images/chars/Dash.png'},
        {id: 6, url: 'images/vendor/images/chars/DavyJones.png'},
        {id: 7, url: 'images/vendor/images/chars/Edna.png'},
        {id: 8, url: 'images/vendor/images/chars/Francesco.png'},
        {id: 9, url: 'images/vendor/images/chars/Gibbs.png'},
        {id: 10, url: 'images/vendor/images/chars/Helen.png'},
        {id: 11, url: 'images/vendor/images/chars/Holly.png'},
        {id: 12, url: 'images/vendor/images/chars/JackSkellington.png'},
        {id: 13, url: 'images/vendor/images/chars/Jessie.png'},
        {id: 14, url: 'images/vendor/images/chars/LoneRanger.png'},
        {id: 15, url: 'images/vendor/images/chars/Mater.png'},
        {id: 16, url: 'images/vendor/images/chars/McQueen.png'},
        {id: 17, url: 'images/vendor/images/chars/Mike.png'},
        {id: 18, url: 'images/vendor/images/chars/Perry.png'},
        {id: 19, url: 'images/vendor/images/chars/Phineas.png'},
        {id: 20, url: 'images/vendor/images/chars/Ralph.png'},
        {id: 21, url: 'images/vendor/images/chars/Sully.png'},
        {id: 22, url: 'images/vendor/images/chars/Syndrome.png'},
        {id: 23, url: 'images/vendor/images/chars/Tonto.png'},
        {id: 24, url: 'images/vendor/images/chars/Violet_2.png'},
        {id: 25, url: 'images/vendor/images/chars/Woody.png'}
    ]
});
