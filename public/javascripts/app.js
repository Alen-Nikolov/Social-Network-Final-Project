var app = angular.module('myApp', ['ngRoute', 'infinite-scroll', 'myModule']);
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "../views/home.htm",
        controller: 'postController'
    }).when('/profile/:userId', {
        templateUrl: "../views/profile.htm",
        controller: 'userController'
    });

});
