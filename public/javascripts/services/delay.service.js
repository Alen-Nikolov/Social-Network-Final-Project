app.factory('delayService', function () {
    var timers = {};
    var timer = 0;
    return {
        delay: (function (callback, ms) {
                clearTimeout(timers[timer]);
                console.log(timers);
                delete timers[timer];
                console.log(timers);
                timer = setTimeout(callback, ms);
                timers["" + timer] = timer;
        })()
    };
});
