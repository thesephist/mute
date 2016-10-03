var MuteVideos = MuteUtils.nodeListToArray($$("video[autoplay]"));

function muteVideoElement(el) {
    // mute stuff
    console.log('Muting elements!');
}

function stopVideoElement(el) {
    // stop video element
    console.log('Stopping elements!');
}

// await message from main thread of popup
chrome.runtime.onMessage.addListener((request, sender, response) => {
    // parse the message to see if 1) mute and 2) apply
    console.info(request.exemptDomains, request.muteMode);
    var willRun = request.exemptDomains instanceof Array && request.exemptDomains.indexOf(document.domain),
        muteMode = request.muteMode; // not just mute

    if (willRun> -1) return;

    MuteVideos.forEach(el => {
        muteMode == 0 ? muteVideoElement(el) : stopVideoElement(el);
    });
});
