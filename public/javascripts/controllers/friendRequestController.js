app.controller('friendRequestController', ['$scope', '$rootScope', 'friendRequestService', function($scope, $rootScope, friendRequestService) {
    //============= LOAD ALL FRIEND REQUESTS ================
    friendRequestService.downloadFriendRequests().then(function(res) {
        $scope.friendRequests = res.data;
        $scope.someRequests = $scope.friendRequests.slice(0, 5);
        $scope.loadMore = function() {
            $scope.someRequests = $scope.friendRequests.slice(0, $scope.someRequests.length + 5);
        };
    });

}]);