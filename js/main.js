var Mute = {

    // elements
    el: {
        excludeOnButton: $(".excluder .on"),
        excludeOffButton: $(".excluder .off"),
        muteButton: $(".muter .mute"),
        stopButton: $(".muter .stop")
    },

    // events
    ev: {
        "excludeOnButton click": "excludeSite",
        "excludeOffButton click": "includeSite",
        "muteButton click": "setMute",
        "stopButton click": "setStop"
    },

    // functions
    f: {
        getDomainName: function() {
            // get window domain name
        },

        excludeSite: function(evt) {
            // get domain name and add it to exclusion list and save
        },

        includeSite: function(evt) {
            // get domain name and remove it from exclusion list and save
        },

        setMute: function(evt) {
            // set mute in settings and save
        },

        setStop: function(evt) {
            // set stop in settings and save
        },

        render: function() {
            // master render function for setting button settings
        }
    },

};

Mute.init = function() {

    // add event listeners
    Object.keys(Mute.ev).forEach(function(identifier) {
        var eventName = identifier.split(" ")[0],
            selector = identifier.split(" ").splice(1).join(" "),
            fn = Mute.f[Mute.ev[identifier]];

        MuteUtils.eventAdder(selector, eventName, fn);
    });

    console.info("Mute initialized");

};

Mute.init();
