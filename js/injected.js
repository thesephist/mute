var MuteVideos = MuteUtils.nodeListToArray($$("video[autoplay]"));

function muteVideoElement(el) {
    // mute stuff
}

function stopVideoElement(el) {
    // stop video element
}

// await message from main thread of popup
chrome.runtime.onMessage.addListener(function(request, sender, response) {
  // parse the message to see if 1) mute and 2) apply
  var willRun = response.exemptDomains.indexOf(document.domain),
      muteMode = response.muteMode; // not just mute

  if (!willRun) return;

  MuteVideos.forEach(muteMode == 0 ? muteVideoElement() : stopVideoElement());
});
