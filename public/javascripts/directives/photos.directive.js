app.directive('photos', ["$rootScope", "photoService", "commentService", function ($rootScope, photoService, commentService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: './javascripts/directives/photos.directive.htm',
        link: function (scope, $element) {
            var photoId = scope.data._id;
            var userId = $rootScope.user._id;

            scope.IsVisible = false;
            scope.showHideComments = function () {
                scope.IsVisible = !scope.IsVisible;
            };

            scope.isLiked = function () {
                if (scope.data.likes.indexOf(userId) === -1) {
                    $element.find('.like-btn').removeClass('change-color');
                } else {
                    $element.find('.like-btn').addClass('change-color');
                }
            };
            scope.isLiked();

            scope.changeLike = function ($event) {
                photoService.changeLike(photoId).then(function (res) {
                    if (res.data[0].likes.indexOf(userId) === -1) {
                        scope.data.likes.push(userId);
                        scope.isLiked();
                    } else {
                        scope.data.likes.splice(scope.data.likes.indexOf(userId), 1);
                        scope.isLiked();
                    }
                });
            };
            scope.numOfComments = function () {
                commentService.downloadComments(photoId).then(function (res) {
                    scope.comments = res.data;
                });
            };
            scope.numOfComments();
            $element.find('.input-flex textarea').css('overflow', 'hidden').autogrow();
        }
    };
}]);