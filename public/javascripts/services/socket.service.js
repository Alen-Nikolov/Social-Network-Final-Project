/**
 * service for the socket of the chat
 */
app.factory('socketService', function () {
    var socket = io.connect();
    return {
        newMessage: function (callback) {
            socket.on('new message', function () {
                callback(arguments[0]);
            });
        },
        sendMessage: function (data, callback) {
            socket.emit('send message', data, function () {

            });
        }
    };
});