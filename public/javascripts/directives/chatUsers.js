app.directive('chatUsers', ['$rootScope', "userService", function($rootScope, userService) {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: './javascripts/directives/chatUsers.htm',
        link: function(scope, $element) {
            scope.startChat = function($event) {
                $("#chatDivScroll").scrollTop($("#chatDivScroll")[0].scrollHeight);
                var friendId = scope.data._id;
                var friendName = scope.data.fullName;
                $('.btn-chat').attr('data-friendId', friendId);
                $('.friendName').html('with <strong>' + friendName + '</strong>');
                userService.getMessages(friendId).then(function(res) {
                    $("div.listWithMessages").html("");
                    scope.$parent.$parent.messages = res.data;

                });
            }
        }
    };
}]);