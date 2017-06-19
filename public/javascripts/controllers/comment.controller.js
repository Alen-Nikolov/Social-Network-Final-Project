app.controller('commentController', ['$scope', '$rootScope', 'commentService', 'userService', function ($scope, $rootScope, commentService, userService) {
    var postId = $scope.$parent.data._id;
    var userId = $rootScope.user._id;
    var user = $rootScope.user;

    /**
     * Fucntion for adding comments
     */
    $scope.addComment = function () {
        var comment = {
            text: $scope.commentText,
            postId: postId,
            user_id: userId,
            fname: user.fname,
            lname: user.lname,
            userProfImg: user.PROFILE_IMG_URL || "../images/profile.jpg",
            likes: [],
            date: new Date().toLocaleString()
        };
        /**
         * If the comment text is empty the function addComment does not fire3
         */
        if (comment.text !== "") {
            commentService.addComment(comment).then(function (res) {
                if (res.status === 201) {
                    $scope.comments.push(res.data);
                    $scope.$parent.numOfComments();
                    $scope.commentText = "";
                }
            });
        }
    };

    /**
     * Download all comments of a post and put them in the scope
     */
    commentService.downloadComments(postId).then(function (res) {
        $scope.comments = res.data;
    });

    /**
     * Get the user that is currently logged in
     */
    userService.getCurrentUser().then(function (res) {
        $scope.user = res.data;
    });


}]);