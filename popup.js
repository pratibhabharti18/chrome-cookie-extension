document.getElementById("open").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        let overlay = document.getElementById("cookie-overlay");
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
            <button id="grant-cookie" style="margin-top:10px;padding:10px;width:100%;background:#0078d7;color:white;border:none;border-radius:6px;font-size:15px;cursor:pointer;">Grant Cookie Access</button>
            <button id="show-cookies" style="margin-top:10px;padding:10px;width:100%;background:#28a745;color:white;border:none;border-radius:6px;font-size:15px;cursor:pointer;">Show Cookies</button>
            <button id="revoke-permission" style="margin-top:10px;padding:10px;width:100%;background:#ff9800;color:white;border:none;border-radius:6px;font-size:15px;cursor:pointer;">Revoke Permission</button>
            <button id="clear-cookies" style="margin-top:10px;padding:10px;width:100%;background:#d9534f;color:white;border:none;border-radius:6px;font-size:15px;cursor:pointer;">Clear All Cookies</button>
            <div id="cookie-data" style="margin-top:15px;max-height:180px;overflow:auto;font-size:13px;border-top:1px solid #eee;padding-top:10px;"></div>
          `;
          document.body.appendChild(overlay);

          // Styled message helper
          function showMessage(msg, type = "info") {
            let bgColor, textColor;
            if (type === "success") { bgColor = "#d4edda"; textColor = "#155724"; }
            else if (type === "error") { bgColor = "#f8d7da"; textColor = "#721c24"; }
            else { bgColor = "#d1ecf1"; textColor = "#0c5460"; } // info

            document.getElementById("cookie-data").innerHTML = `
              <div style="background:${bgColor};color:${textColor};padding:10px;border-radius:6px;margin-top:5px;">
                ${msg}
              </div>
            `;
          }

          // Close button
          document.getElementById("close-overlay").addEventListener("click", () => {
            overlay.style.display = "none";
          });

          // Grant Cookie Access
          document.getElementById("grant-cookie").addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "grantPermission" }, () => {
              showMessage("✅ Cookie access granted!", "success");
            });
          });

          // Show Cookies
          document.getElementById("show-cookies").addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "getCookies", url: location.href }, (response) => {
              if (!response.cookies || response.cookies.length === 0) {
                showMessage("⚠️ No cookies found.", "error");
              } else {
                showMessage(
                  "🍪 Cookies found:<br>" +
                  response.cookies.map(c => `<strong>${c.name}</strong>: ${c.value}`).join("<br>"),
                  "info"
                );
              }
            });
          });

          // Revoke Permission
          document.getElementById("revoke-permission").addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "revokePermission" }, () => {
              showMessage("⛔ Permission revoked!", "error");
            });
          });

          // Clear Cookies
          document.getElementById("clear-cookies").addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "clearCookies", url: location.href }, () => {
              showMessage("🗑️ All cookies cleared!", "success");
            });
          });
        } else {
          overlay.style.display = overlay.style.display === "none" ? "block" : "none";
        }
      }
    });
  });
});
