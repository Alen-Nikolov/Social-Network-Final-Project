app.directive('friendRequests', ["userService", function (userService) {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: './javascripts/directives/friendRequests.htm',
        link: function (scope) {
            var reqFriendId = scope.data._id;
            scope.requestVisible = 'pending';
            //  =============== CONFIRM FRIEND REQUEST =========
            scope.confirmRequest = function () {
                userService.confirmRequest(reqFriendId).then(function (data) {
                    scope.requestVisible = 'accepted';
                });
            };
            //  =============== REJECT FRIEND REQUEST =========
            scope.rejectRequest = function () {
                userService.rejectRequest(reqFriendId).then(function (data) {
                    scope.requestVisible = 'rejected';
                });
            };
        }
    };
}]);