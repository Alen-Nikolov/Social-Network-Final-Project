app.controller('friendRequestController', ['$scope', '$rootScope', 'friendRequestService', function ($scope, $rootScope, friendRequestService) {
    //============= LOAD ALL FRIEND REQUESTS ================
    var FRIEND_REQUESTS_TO_SHOW = 5;
    friendRequestService.downloadFriendRequests().then(function (res) {
        $scope.friendRequests = res.data;
        $scope.someRequests = $scope.friendRequests.slice(0, FRIEND_REQUESTS_TO_SHOW);
        $scope.loadMore = function () {
            $scope.someRequests = $scope.friendRequests.slice(0, $scope.someRequests.length + FRIEND_REQUESTS_TO_SHOW);
        };
    });
}]);