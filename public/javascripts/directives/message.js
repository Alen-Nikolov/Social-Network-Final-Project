app.directive('message', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: './javascripts/directives/message.htm'
    };
});