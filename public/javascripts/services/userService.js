app.factory('userService', function ($http, $rootScope) {
    function User() {
        this.user = $http.get('/user');
        this.posts = null;
        this.users = null;
        this.friends = null;
    }
    User.prototype.getCurrentUser = function () {
        return this.user;
    };
    User.prototype.getUsers = function (userName) {
        return this.users = $http.get('/user/find/' + userName);
    };
    User.prototype.downloadUserPosts = function (userId) {
        return this.posts = $http.get('/user/posts/' + userId);
    };
    User.prototype.getUserProfile = function (userId) {
        return this.profile = $http.get('/user/' + userId);
    };
    User.prototype.getMessages = function (friendId) {
        return this.profile = $http.get('/user/chat/' + friendId);
    };
    return new User();
});