app.directive('chatUsers', ['$rootScope', 'userService', function($rootScope, userService) {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: './javascripts/directives/chat-users.htm'
    };
}]);