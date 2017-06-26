app.controller('chatUsersController', ['$scope', '$rootScope', '$http', '$element', 'delayService', 'userService', 'socketService',
    function ($scope, $rootScope, $http, $element, delayService, userService, socketService) {
        var receiverId = null;
        var TIMEOUT_ON_KEYPRESS_CHAT = 300;
        var chat = document.getElementById("chat-div-scroll");


        /**
         * loads users by their name
         */
        function loadUsersByName() {
            if ($scope.searchForChat !== "") {
                userService.getUsers($scope.searchForChat).then(function (res) {
                    $scope.chatUsers = res.data;
                });
            }
        }

        /**
         * Filters users by their name and fires events on keypress with delay
         */
        $scope.filterUsersForChat = function () {
            delayService.delay(loadUsersByName, TIMEOUT_ON_KEYPRESS_CHAT);
        };


        /**
         * show the div with the users if there is something in the input field
         */
        $scope.showUsersForChat = function () {
            $scope.showDivChatUsers = !!$scope.searchForChat;
        };

        $scope.closeDivUsers = function () {
            $scope.showDivChatUsers = false;
        };

        /**
         * Starts chat with the user that's chosen
         * @param {string} friendId - friend's id from database
         * @param {string} chatFriendName -the friend's fullName
         */
        $scope.startChat = function (friendId, chatFriendName) {
            userService.getMessages(friendId).then(function (res) {
                $scope.messages = res.data;
                receiverId = friendId;
                $scope.friendName = chatFriendName;
            });
        };

        /**
         * Takes the message from the user and sends it through the socket in the form of an object
         */
        $scope.sendMessage = function () {
            var text = $scope.messageText;
            if (receiverId !== undefined && text !== "" && text !== undefined) {
                var message = {
                    name: $rootScope.user.fullName,
                    picture: $rootScope.user.PROFILE_IMG_URL,
                    text: text,
                    senderId: $rootScope.user._id,
                    receiverId: receiverId
                };
                socketService.sendMessage(message);
            }
            $scope.messageText = '';
        };

        /**
         * When a new message arrives put it into messages array and force the digest cycle to run
         */
        socketService.onNewMessage(function (data) {
            var receiver = data.msg.receiverId;
            var sender = data.msg.senderId;
            if (receiver === $rootScope.user._id || sender === $rootScope.user._id) {
                if ($scope.messages.indexOf(data.msg) === -1) {
                    $scope.messages.push(data.msg);
                    $scope.$apply();
                    chat.scrollTop = chat.scrollHeight;
                }
            }
        });
    }]);