module.exports.adblock = (browserWindow) => {
  containsAds = (url) =>{
    const YT = 'https://www.youtube.com';
    var blackListedUrls = [
      "https://ad.doubleclick.net/*",
      "https://googleads.g.doubleclick.net/*",
      "https://*.googlesyndication.com/*",
      "https://imasdk.googleapis.com/*",
      "https://securepubads.g.doubleclick.net/*",
      "https://static.adsafeprotected.com/*",
      "https://static.doubleclick.net/*",
      "https://tpc.googlesyndication.com/*",
      "https://www.google.com/ads*",
      "https://www.google.com/pagead/*",
      "https://www.googleadservices.com/*",
      "https://www.google-analytics.com/*",
      "https://www.googletagmanager.com/*",
      "https://www.googletagservices.com/*",
      YT + "/*/ads*",
      YT + "/*ad_companion*",
      YT + "/*adcompanion*",
      YT + "/csi*",
      YT + "/error_204*",
      YT + "/get_midroll_info*",
      YT + "/*/log_event*",
      YT + "/*/log_interaction*",
      YT + "/pagead/*",
      YT + "/ptracking*",
      YT + "/*/stats/*",
      YT + "/service_ajax*",
      YT + "/sw.js*"
    ];
    function checkUrlPatternMatches(url, pattern) {
      var components = pattern.split("*"),
      componentsFoundFlag = true;
      for (var i = 0; i < components.length && componentsFoundFlag; i++) {
        componentsFoundFlag = url.indexOf(components[i]) > -1
      }
      return componentsFoundFlag;
    }
    return blackListedUrls.find((burl) => checkUrlPatternMatches(url, burl)) ? true : false;
  }
  browserWindow.webContents.session.webRequest.onBeforeRequest(['*://*./*'], (details, cb) => {
    const shouldBeBlocked = containsAds(details.url);
    if (shouldBeBlocked) {
      cb({cancel: true });
    } else {
      cb({cancel: false });
    }
  });
};
