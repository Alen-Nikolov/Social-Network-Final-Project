app.directive('friendRequests', ["userService", function (userService) {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: './javascripts/directives/friendRequests.htm',
        link: function (scope) {
            scope.PENDING = 1;
            scope.ACCEPTED = 2;
            scope.REJECTED = 3;
            var reqFriendId = scope.data._id;
            scope.requestVisible = scope.PENDING;
            //  =============== CONFIRM FRIEND REQUEST =========
            scope.confirmRequest = function () {
                userService.confirmRequest(reqFriendId).then(function (data) {
                    scope.requestVisible = scope.ACCEPTED;
                });
            };
            //  =============== REJECT FRIEND REQUEST =========
            scope.rejectRequest = function () {
                userService.rejectRequest(reqFriendId).then(function (data) {
                    scope.requestVisible = scope.REJECTED;
                });
            };
        }
    };
}]);