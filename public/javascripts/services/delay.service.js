app.factory('delayService', function () {
    return {
        delay: (function () {
            var timers = {};
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timers[timer]);
                delete timers[timer];
                timer = setTimeout(callback, ms);
                timers["" + timer] = timer;
            };
        })()
    };

});
