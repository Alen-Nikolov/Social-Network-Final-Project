app.controller('friendsController', ['$scope', '$routeParams', 'friendRequestService', function ($scope, $routeParams, friendRequestService) {
    var userId = $routeParams.userId;
    var FRIENDS_TO_SHOW = 20;
    //============= LOAD ALL FRIENDS ================
    friendRequestService.downloadFriends(userId).then(function (res) {
        $scope.friends = res.data;
        $scope.someFriends = $scope.friends.slice(0, FRIENDS_TO_SHOW);
        $scope.loadMore = function () {
            $scope.someFriends = $scope.friends.slice(0, $scope.someFriends.length + FRIENDS_TO_SHOW);
        };
    });
}]);