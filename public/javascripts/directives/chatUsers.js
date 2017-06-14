app.directive('chatUsers', ['$rootScope', 'userService', function($rootScope, userService) {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: './javascripts/directives/chatUsers.htm',
        link: function(scope, $element) {
            scope.startChat = function($event) {

            }
        }
    };
}]);