app.controller('postController', ['$scope', '$http', '$rootScope', 'postService', 'userService', function ($scope, $http, $rootScope, postService, userService) {
    // =========== LOAD ALL POSTS =============
    var postPicture = null;
    var postText='';
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

    /**
     * A function that sends new posts to server
     * @param {file} postPicture the image to send to server
     * @param {string} postText the text of the post
     */
    $scope.uploadFile = function () {
        postPicture = $scope.postPicture;
        postText = $scope.postText;
        var uploadUrl = "/posts/";
        var fd = new FormData();

        //check if text is empty or undefined
        if (postText) {
            fd.append('text', postText);
            fd.append('file', postPicture);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (data) {
                data.date = new Date(data.date).toLocaleDateString('en-GB');
                $scope.posts.unshift(data);
                $scope.postText = '';
                $scope.postPicture = null;
            });
        }
    };

}]);