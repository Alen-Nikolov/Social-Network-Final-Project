app.directive('friendRequests', ["userService", function(userService) {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: './javascripts/directives/friendRequests.htm',
        link: function(scope, $element) {
            var reqFriendId = scope.data._id;
            console.log(reqFriendId);
            //  =============== CONFIRM FRIEND REQUEST =========
            scope.confirmRequest = function($event) {
                userService.confirmRequest(reqFriendId).then(function(data) {
                    $($event.currentTarget).hide();
                    $($event.currentTarget.parentNode).append('<p>Friend request sent</p>');
                    console.log("friend request confirmed")
                });
            };
            //  =============== REJECT FRIEND REQUEST =========
            scope.rejectRequest = function($event) {
                userService.rejectRequest(reqFriendId).then(function(data) {});
            };

        }
    };
}]);