app.controller('chatUsersController', ['$scope', '$rootScope', '$http', 'delayService', 'userService', function ($scope, $rootScope, $http, delayService, userService) {
    // ============= SEARCH USER BY FULL NAME ================
    var TIMEOUT_ON_KEYPRESS_CHAT = 300;


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
    // ================= SHOW/HIDE CHAT WINDOW =================
    $scope.hideShowChat = function () {
        $('.slide-toggle').slideToggle();
    };


}]);