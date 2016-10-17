var MuteVideos = MuteUtils.nodeListToArray($$("video[autoplay]"));

function muteVideoElement(el) {
    // mute element
    el.volume = 0;
    setTimeout(el => {
        el.volume = 0;
    }, 500);
}

function stopVideoElement(el) {
    // stop video element
    muteVideoElement(el);
    setTimeout(el => {
        el.stop();
        el.volume = 1;
    }, 500);
}

// await message from main thread of popup
chrome.runtime.onMessage.addListener((request, sender, response) => {
    // parse the message to see if 1) mute and 2) apply
    var willRun = request.exemptDomains instanceof Array && request.exemptDomains.indexOf(document.domain),
        muteMode = request.muteMode; // not just mute

    console.log(willRun, muteMode);

    if (willRun > -1) return;

    MuteVideos.forEach(el => {
        muteMode == 0 ? muteVideoElement(el) : stopVideoElement(el);
    });
});
