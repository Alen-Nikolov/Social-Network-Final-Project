var app = angular.module('myApp', ['ngRoute', 'infinite-scroll']);
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "../views/home.htm",
        controller: 'postController'
    }).when('/profile/:userId', {
        templateUrl: "../views/profile.htm",
        controller: 'userController'
    });

});

app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src !== attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);