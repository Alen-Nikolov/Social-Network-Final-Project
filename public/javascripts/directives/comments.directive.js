app.directive('comments', ["$rootScope", "commentService", function ($rootScope, commentService) {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: './javascripts/directives/comments.directive.htm',
        link: function (scope) {
            var comments = scope.$parent.comments;
            var userId = $rootScope.user._id;
            var comId = scope.data._id;

            if (comments.length !== 0) {
                scope.isLikedComment = function () {
                    if (scope.data.likes.indexOf(userId) === -1) {
                        scope.isLiked = false;
                    } else {
                        scope.isLiked = true;
                    }
                };
                scope.isLikedComment();

                scope.changeLikeComment = function () {
                    commentService.changeLikeComment(comId).then(function (res) {
                        if (res.data[0].likes.indexOf(userId) === -1) {
                            scope.data.likes.push(userId);
                            scope.isLiked = true;
                        } else {
                            scope.data.likes.splice(scope.data.likes.indexOf(userId), 1);
                            scope.isLiked = false;
                        }
                    });
                }
            }
        }


    };
}]);