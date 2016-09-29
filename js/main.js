var Mute = {

    // muteMode 0 is just mute,
    // muteMode 1 is mute and stop
    muteMode: 0,
    exemptDomains: [],
    currentDomain: null,

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
        setDomainName: function(callback) {
            // get window domain name
            var self = this;
            chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function(tabs) {
                self.currentDomain = tabs[0].url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/)[0];
            });
        },

        toast: function(message) {
           // pop up a toast
        },

        excludeSite: function(evt) {
            if (this.currentDomain && exemptDomains.indexOf(this.currentDomain) == -1) this.exemptDomains.push(this.currentdomain);

            this.setSettings();
            this.render();
        },

        includeSite: function(evt) {
            if (!this.currentDomain) return;

            var index = exemptDomains.indexOf(this.currentDomain);
            if (index > -1) this.exemptDomains.split(index, 1);

            this.setSettings();
            this.render();
        },

        setMute: function(evt) {
            this.muteMode = 0;

            this.setSettings();
            this.render();
        },

        setStop: function(evt) {
            this.muteMode = 1;

            this.setSettings();
            this.render();
        },

        render: function() {
            switch (this.muteMode) {
                case 0:
                    this.el.stopButton.classList.remove("active");
                    this.el.muteButton.classList.add("active");
                    break;
                case 1:
                    this.el.muteButton.classList.remove("active");
                    this.el.stopButton.classList.add("active");
                    break;
            }

            if (this.currentDomain && exemptDomains.indexOf(this.currentDomain) > -1) {
                Mute.el.excludeOffButton.classList.remove("active");
                Mute.el.excludeOnButton.classList.add("active");
            } else {
                Mute.el.excludeOnButton.classList.remove("active");
                Mute.el.excludeOffButton.classList.add("active");
            }
        },

        getSettings: function() {
            // return settings
            chrome.storage.sync.get({
                // keys and default values
                muteMode: this.muteMode,
                exemptDomains: this.exemptDomains
            }, function(record){
                this.muteMode = record.muteMode;
                this.exemptDomains = record.muteMode;
            });

            return {
                muteMode: this.muteMode,
                exemptDomains: this.exemptDomains
            };
        },

        setSettings: function() {

          chrome.storage.sync.set({
              muteMode: this.muteMode,
              exemptDomains: this.exemptDomains
          }, function(){
              this.toast("Saved!")
          });
        },

        sendMessage: function(message) {
            // send mssage to injected.js
            chrome.runtime.sendMessage(this.getSettings());
        }
    }

};

Mute.init = function() {

    // add event listeners
    Object.keys(Mute.ev).forEach(function(identifier) {
        var eventName = identifier.split(" ")[0],
            selector = identifier.split(" ").splice(1).join(" "),
            fn = Mute.f[Mute.ev[identifier]];

        MuteUtils.eventAdder(selector, eventName, fn);
    });

    // read and apply settings
    Mute.f.getSettings();
    Mute.f.setDomainName();
    Mute.f.render();

    // transferring communicable data about each site
    Mute.f.sendMessage();

    console.info("Mute initialized");

};

Mute.init();
