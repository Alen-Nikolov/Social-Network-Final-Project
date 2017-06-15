app.factory('delayService', function () {
    var timers = {};
    var timer = null;
    return {
        delay: function (callback, ms) {
            clearTimeout(timers[timer]);
            delete timers[timer];
            timer = setTimeout(callback, ms);
            timers["" + timer] = timer;
        }
    };
});
