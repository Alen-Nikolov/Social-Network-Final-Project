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
    // ===================== PHOTO ATTACHED ======================
    $('.input-files').on('change', function () {
        if ($('.input-files').val()) {
            $('.file-attached').show();
        } else {
            $('.file-attached').hide();
        }
    });
    /**
     * @param
     */
    $scope.uploadFile = function () {

        var file = $scope.postPicture;
        var postText = $scope.postText;
        var uploadUrl = "/posts/";
        var fd = new FormData();
        if(postText!="" && postText!=undefined){
            fd.append('text', postText);
            fd.append('file', file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (data) {
                data.date = new Date(data.date).toLocaleDateString('en-GB');
                $scope.posts.unshift(data);
                $scope.postText='';
                console.log($scope.postPicture);
                $scope.postPicture=null;
            }).error(function () {

            });
        }
    };

}]);