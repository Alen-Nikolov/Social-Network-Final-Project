app.controller('userController', ['$http', '$scope', '$routeParams', '$rootScope', 'delayService', 'userService', function ($http, $scope, $routeParams, $rootScope, delayService, userService) {
    var userId = $routeParams.userId;
    var POSTS_TO_SHOW = 5;
    var TIMEOUT_ON_KEYPRESS = 300;
    $scope.TIMELINE_PAGE = 1;
    $scope.PHOTOS_PAGE = 2;
    $scope.FRIENDS_PAGE = 3;

    function loadUsersByName() {
        if ($scope.searchFriendsInput !== "") {
            userService.getUsers($scope.searchFriendsInput).then(function (res) {
                $scope.users = res.data;
            });
        }
    }

    /**
     * If the user has logged in, download his posts
     */
    if (userId) {
        userService.downloadUserPosts(userId).then(function (res) {
            $scope.posts = res.data;
            $scope.somePosts = $scope.posts.slice(0, POSTS_TO_SHOW);
            $scope.loadMore = function () {
                $scope.somePosts = $scope.posts.slice(0, $scope.somePosts.length + POSTS_TO_SHOW);
            };
        });
    }

    /**
     * checks if the user is looking at his own profile or someone else's
     */
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
        delayService.delay(loadUsersByName, TIMEOUT_ON_KEYPRESS);
    };

    // ================= SHOW DROP DOWN WITH FOUND USERS BY FULL NAME  =========
    $scope.showUsers = function () {
        $scope.searchFriendsDiv = $scope.searchFriendsInput ? true : false;
    };

    // ===================== SHOW USER TIMELINE FIRST =====================
    $scope.show = $scope.TIMELINE_PAGE;

    // ======================= ADD UPLOAD PICTURE TO POST ==================
    $scope.closeDivUsers = function () {
        $scope.searchFriendsDiv = false;
    };
        //TODO: Make the post pictures of the current user also change without a refresh
    $scope.uploadProfilePhoto = function () {
        var uploadUrl = "/user/coverAvatar";
        var fd = new FormData();
        //check if there is a photo
        if ($scope.avatarPicture) {
            fd.append('avatar', $scope.avatarPicture);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (data) {
                $scope.avatarPicture = null;
                $rootScope.user.PROFILE_IMG_URL = data;
            });
        }
    };

    $scope.uploadCoverPhoto = function () {
        var uploadUrl = "/user/coverAvatar";
        var fd = new FormData();
        //check if there is a photo
        if ($scope.coverPicture) {
            fd.append('cover', $scope.coverPicture);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (data) {
                $scope.coverPicture = null;
                $rootScope.user.COVER_PHOTO_URL = data;
            });
        }
    };
}]);