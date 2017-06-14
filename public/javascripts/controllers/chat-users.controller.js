app.controller('chatUsersController', ['$scope', '$rootScope', '$http', 'delayService', 'userService',
    function ($scope, $rootScope, $http, delayService, userService) {
        // ============= SEARCH USER BY FULL NAME ================
        var TIMEOUT_ON_KEYPRESS_CHAT = 300;
        var receiverId = null;
        var socket = io.connect();

        function loadUsersByName(userName) {
            userService.getUsers(userName).then(function (res) {
                $scope.chatUsers = res.data;
            });
        }

        $scope.filterUsersForChat = function () {
            var userName = $scope.searchForChat;
            delayService.delay(loadUsersByName(userName), TIMEOUT_ON_KEYPRESS_CHAT);
        };

        // ================= SHOW DROPDOWN WITH FOUND USERS BY FULL NAME  =========
        $scope.showUsersForChat = function () {
            if ($scope.searchForChat == "") {
                $scope.showDivChatUsers = false;
            } else {
                $scope.showDivChatUsers = true;
            }
        };

        $scope.closeDivUsers = function () {
            $scope.showDivChatUsers = false;
        };

        $scope.startChat = function (friendId, chatFriendName) {
            userService.getMessages(friendId).then(function (res) {
                $scope.messages = res.data;
                receiverId = friendId;
                $scope.friendName = chatFriendName;
            });
        };
        $scope.sendMessage = function () {
            var text = $scope.messageText;
            if (receiverId && text) {
                var message = {
                    name: $rootScope.user.fullName,
                    picture: $rootScope.user.PROFILE_IMG_URL,
                    text: text,
                    senderId: $rootScope.user._id,
                    receiverId: receiverId
                };
                socket.emit('send message', message);
            }
            $scope.messageText = '';

            socket.on("new message", function (data) {
                var receiver = data.msg.receiverId;
                var sender = data.msg.senderId;
                if (receiver === $rootScope.user._id || sender === $rootScope.user._id) {
                    if ($scope.messages.indexOf(data.msg) === -1) {
                        $scope.messages.push(data.msg);
                        $scope.$apply();
                    }
                }
            });
        };


    }]);