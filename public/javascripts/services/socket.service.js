/**
 * service for the socket of the chat
 */
app.factory('socketService', function () {
    var socket = io.connect();
    return {
        /**
         * @param {Function} callback - function to be executed when the event fires
         */
        onNewMessage: function (callback) {
            socket.on('new message', function (message) {
                if (typeof callback === 'function') {
                    callback(message);
                }
            });
        },
        /**
         * @param {any} data - message that is received
         */
        sendMessage: function (data) {
            socket.emit('send message', data, function () {

            });
        }
    };
});