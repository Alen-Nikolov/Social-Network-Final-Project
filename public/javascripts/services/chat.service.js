/**
 * service for the socket of the chat
 */
app.factory('socket', function () {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                callback(arguments[0]);
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {

            });
        }
    };
});