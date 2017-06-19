app.factory('delayService', function () {
    return {
        delay: (function () {
            var timer = null;
            return function (callback, ms) {
                if (timer !== null) {
                    clearTimeout(timer);
                }
                timer = setTimeout(callback, ms);
            };
        })()
    };

});
