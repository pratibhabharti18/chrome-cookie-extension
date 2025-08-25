if (!window.cookieOverlayInjected) {
  window.cookieOverlayInjected = true;

  let overlay = null;

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "toggleOverlay") {
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "cookie-overlay";
        overlay.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #fff;
          color: #000;
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 16px;
          z-index: 999999999;
          width: 360px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          font-family: Arial, sans-serif;
          font-size: 14px;
        `;
        overlay.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong style="font-size:16px;">Cookie Info</strong>
            <button id="close-overlay" style="border:none;background:transparent;font-size:20px;cursor:pointer;">×</button>
          </div>
          <hr>
          <p><strong>URL:</strong> ${location.href}</p>
          <p><strong>Domain:</strong> ${location.hostname}</p>
          <p><strong>HTTPS:</strong> ${location.protocol === "https:" ? "Yes" : "No"}</p>
          <button id="grant-cookie" style="margin-top:10px;padding:10px;width:100%;background:#0078d7;color:white;border:none;border-radius:6px;font-size:15px;cursor:pointer;">Grant Cookie Access</button>
          <button id="show-cookies" style="margin-top:10px;padding:10px;width:100%;background:#28a745;color:white;border:none;border-radius:6px;font-size:15px;cursor:pointer;">Show Cookies</button>
          <button id="revoke-permission" style="margin-top:10px;padding:10px;width:100%;background:#ff9800;color:white;border:none;border-radius:6px;font-size:15px;cursor:pointer;">Revoke Permission</button>
          <button id="clear-cookies" style="margin-top:10px;padding:10px;width:100%;background:#d9534f;color:white;border:none;border-radius:6px;font-size:15px;cursor:pointer;">Clear All Cookies</button>
          <div id="cookie-data" style="margin-top:15px;max-height:180px;overflow:auto;font-size:12px;border-top:1px solid #eee;padding-top:10px;"></div>
        `;
        document.body.appendChild(overlay);

        const msgBox = document.getElementById("cookie-data");

        function showMessage(text) {
          const now = new Date().toLocaleTimeString();
          msgBox.innerHTML = `<div style="background:#f1f1f1;padding:8px;border-radius:6px;margin-top:5px;">
            ${text}<br><small style="color:#666;">⏱️ ${now}</small></div>`;
        }

        // Close
        document.getElementById("close-overlay").onclick = () => overlay.remove();

        // Grant Permission
        document.getElementById("grant-cookie").onclick = () => {
          chrome.runtime.sendMessage({ action: "grantPermission" }, res => showMessage(res.message));
        };

        // Show Cookies
        document.getElementById("show-cookies").onclick = () => {
          chrome.runtime.sendMessage({ action: "getCookies", url: location.href }, res => {
            if (!res.cookies.length) {
              showMessage("⚠️ No cookies found.");
            } else {
              showMessage("🍪 Cookies:<br>" + res.cookies.map(c => `<b>${c.name}</b>: ${c.value}`).join("<br>"));
            }
          });
        };

        // Revoke Permission
        document.getElementById("revoke-permission").onclick = () => {
          chrome.runtime.sendMessage({ action: "revokePermission" }, res => showMessage(res.message));
        };

        // Clear Cookies
        document.getElementById("clear-cookies").onclick = () => {
          chrome.runtime.sendMessage({ action: "clearCookies", url: location.href }, res => showMessage(res.message));
        };
      } else {
        overlay.style.display = overlay.style.display === "none" ? "block" : "none";
      }
    }
  });
}
