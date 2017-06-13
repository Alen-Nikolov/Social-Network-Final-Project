app.controller('userController', ['$http', '$scope', '$routeParams', '$rootScope', 'userService', function ($http, $scope, $routeParams, $rootScope, userService) {
    var userId = $routeParams.userId;
    var POSTS_TO_SHOW = 5;
    var TIMEOUT_ON_KEYPRESS = 300;

    function loadUsersByName() {
        userService.getUsers($scope.searchFriendsInput).then(function (res) {
            $scope.users = res.data;
        });
    }

    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();


    // ================== LOAD ALL USER POSTS ===================
    if (userId) {
        userService.downloadUserPosts(userId).then(function (res) {
            $scope.posts = res.data;
            $scope.somePosts = $scope.posts.slice(0, POSTS_TO_SHOW);
            $scope.loadMore = function () {
                $scope.somePosts = $scope.posts.slice(0, $scope.somePosts.length + POSTS_TO_SHOW);
            };
        });
    }

    // ============= GET CURRENT USER/SHOW FRIENDS PROFILES =======================
    userService.getCurrentUser().then(function (res) {
        $rootScope.user = res.data[0];
        $scope.isCurrentUser = true;
        if (userId === $rootScope.user._id || userId === "" || userId === undefined) {
            $scope.isCurrentUser = true;
            //if it's the current user- show add-post, photoUploader
            $scope.showAddPost = true;
            $scope.showUploadPhotoBtn = true;
            $scope.showBtnAvatar = true;
            $scope.showBtnCover = true;
        } else {
            $scope.isCurrentUser = false;
            $scope.showAddPost = false;
            $scope.showUploadPhotoBtn = false;
            $scope.showBtnAvatar = false;
            $scope.showBtnCover = false;

            //================== GET USER PROFILE =====================
            userService.getUserProfile(userId).then(function (res) {
                $rootScope.profile = res.data;
            });
        }
    });


    // ============= SEARCH USER BY FULL NAME ================
    $scope.filterUsers = function () {
        delay(loadUsersByName, TIMEOUT_ON_KEYPRESS);
    };

    // ================= SHOW DROP DOWN WITH FOUND USERS BY FULL NAME  =========
    $scope.showUsers = function () {
        if ($scope.searchFriendsInput !== "") {
            $scope.searchFriendsDiv = true;
        } else {
            $scope.searchFriendsDiv = false;
        }
    };

    // ===================== SHOW USER TIMELINE FIRST =====================
    $scope.show = 1;

    // ======================= ADD UPLOAD PICTURE TO POST ==================
    $scope.addImageBtnPost = function () {
        angular.element('.create-post input[type=file]').trigger('click');
    };
    $scope.closeDivUsers = function () {
        $scope.searchFriendsDiv = false;
    }
}]);