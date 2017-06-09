/**
 * Created by alen.nikolov on 9.6.2017 г..
 */
app.factory('friendRequestService', function ($http) {
    function FriendRequests() {
        this.friendRequests = null;
    }
    FriendRequests.prototype.downloadFriendRequests = function () {
        return this.friendRequests = $http.get('/user/allfriendsrequests');
    };
    FriendRequests.prototype.confirmRequest = function (reqFriendId) {
        return $http.post('/user/confirm/' + reqFriendId);
    };
    FriendRequests.prototype.rejectRequest = function (reqFriendId) {
        return $http.post('/user/reject/' + reqFriendId);
    };
    FriendRequests.prototype.downloadFriends = function (userId) {
        return this.friends = $http.get('/user/friends/' + userId);
    };
    FriendRequests.prototype.sendFriendRequest = function (userId) {
        return $http.post('/user/friendRequest/' + userId);
    };
    return new FriendRequests();
});