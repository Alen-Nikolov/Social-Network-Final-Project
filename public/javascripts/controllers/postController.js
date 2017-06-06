app.controller('postController', ['$scope', 'postService', 'userService', function ($scope, postService, userService) {
    // =========== LOAD ALL POSTS =============
    postService.downloadPosts().then(function (res) {
        $scope.posts = res.data;
        $scope.posts.forEach((post) => {
            return post.date = new Date(post.date).toLocaleDateString('en-GB');
        });
        $scope.somePosts = $scope.posts.slice(0, 5);
        $scope.loadMore = function () {
            $scope.somePosts = $scope.posts.slice(0, $scope.somePosts.length + 5);
        };
    });
    // ========= GET CURRENT USER =================
    userService.getCurrentUser().then(function (res) {
        $scope.user = res.data;
    });

}]);