chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "grantPermission") {
    chrome.storage.local.set({ cookieAccessGranted: true }, () => {
      sendResponse({ message: "✅ Cookie access granted!" });
    });
    return true;
  }

  if (message.action === "revokePermission") {
    chrome.storage.local.set({ cookieAccessGranted: false }, () => {
      sendResponse({ message: "⛔ Permission revoked (simulated)." });
    });
    return true;
  }

  if (message.action === "getCookies") {
    chrome.storage.local.get(["cookieAccessGranted"], (result) => {
      if (!result.cookieAccessGranted) {
        sendResponse({ cookies: [], message: "⛔ Permission revoked. Grant access to view cookies." });
        return;
      }
      chrome.cookies.getAll({ url: message.url }, (cookies) => {
        sendResponse({ cookies, message: "✅ Cookies retrieved successfully." });
      });
    });
    return true;
  }

  if (message.action === "clearCookies") {
    chrome.storage.local.get(["cookieAccessGranted"], (result) => {
      if (!result.cookieAccessGranted) {
        sendResponse({ message: "⛔ Permission revoked. Grant access to clear cookies." });
        return;
      }
      chrome.cookies.getAll({ url: message.url }, (cookies) => {
        cookies.forEach(cookie => {
          const url = (cookie.secure ? "https://" : "http://") + cookie.domain + cookie.path;
          chrome.cookies.remove({ url, name: cookie.name });
        });
        sendResponse({ message: "✅ All cookies cleared for this site." });
      });
    });
    return true;
  }
});
