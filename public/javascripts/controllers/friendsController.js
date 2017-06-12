app.controller('friendsController', ['$scope','$routeParams', 'friendRequestService', function($scope, $routeParams, friendRequestService) {
    var userId = $routeParams.userId;
    //============= LOAD ALL FRIENDS ================
    friendRequestService.downloadFriends(userId).then(function(res) {
        $scope.friends = res.data;
        $scope.someFriends = $scope.friends.slice(0, 20);
        $scope.loadMore = function() {
            $scope.someFriends = $scope.friends.slice(0, $scope.someFriends.length + 20);
        };
    });
}]);