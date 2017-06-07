app.controller('postController', ['$scope', '$http', '$rootScope', 'postService', 'userService', function ($scope, $http, $rootScope, postService, userService) {
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

    /***
     * This function fires when the button for making new post is pressed.
     * It creates a formData object and puts the file from the input in it, together with the text.
     * Then it sends it to the server as a POST request.
     */

    $scope.uploadFile = function () {
        var file = $scope.postPicture;
        var postText = $scope.postText;
        var uploadUrl = "/posts/";
        var fd = new FormData();

        //check if text is empty or undefined
        if (postText) {
            fd.append('text', postText);
            fd.append('file', file);

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