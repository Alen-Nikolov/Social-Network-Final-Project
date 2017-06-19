app.factory('commentService', function ($http, $rootScope) {
    function Comments() {
        this.comments = null;
    }

    /**
     * Downloads all the comments for a specific post
     * @param {string} postId - the unique ID of the post, for which we need the comments
     * @returns {promise} comments
     */
    Comments.prototype.downloadComments = function (postId) {
        return this.comments = $http.get('/comments/' + postId);
    };

    /**
     * Adds a comment to a post
     * @param {object} comment -the new comment
     */
    Comments.prototype.addComment = function (comment) {
        return $http.post('/comments/', comment);
    };

    /**
     * checks if the comment is already liked or not, and changes it
     * @param {string} comId - id of comment
     */
    Comments.prototype.changeLikeComment = function (comId) {
        return $http.put('/comments/' + comId);
    };

    return new Comments();
});