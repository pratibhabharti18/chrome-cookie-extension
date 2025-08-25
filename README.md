A simple yet powerful Chrome Extension to view, manage, and control cookies directly from your browser.
It provides an overlay UI on any webpage that shows cookie details and allows you to grant access, show cookies, revoke permission, or clear all cookies.

✨ Features

📜 Overlay UI – Displays current webpage details (URL, Domain, HTTPS).

🔑 Grant Cookie Access – Simulates access permissions for cookie management.

👀 Show Cookies – Lists all cookies set by the current page.

❌ Revoke Permission – Revokes granted cookie access.

🧹 Clear All Cookies – Deletes all cookies for the current site.

🎨 Modern UI – Clean, stylish popup & overlay design.

🍪 Cookie-Themed Icons – Cute cookie icons for extension branding.

📂 Project Structure
cookie-manager/
│── manifest.json        # Extension manifest
│── background.js        # Handles cookie operations
│── content.js           # Injects overlay into webpages
│── popup.html           # Popup UI
│── popup.js             # Popup logic
│── popup.css            # Popup styling
└── icons/               # Extension icons (16px, 48px, 128px)

🚀 Installation

Clone or download this repository.

Open Chrome and go to chrome://extensions/.

Enable Developer Mode (top-right).

Click Load unpacked.

Select the project folder (cookie-manager/).

Pin the extension to your toolbar.

🖼️ Usage

Click on the 🍪 Cookie Manager icon in Chrome.

From the popup, click Open / Close Overlay.

The overlay will appear on the current webpage, showing:

Current URL

Domain

HTTPS status

Use the buttons:

Grant Cookie Access → Shows “Access granted!”

Show Cookies → Displays cookies in an alert.

Revoke Permission → Shows “Permission revoked!”.

Clear All Cookies → Deletes all cookies for that site.

🛠️ Tech Stack

Manifest V3 (latest Chrome Extension API)

JavaScript (Vanilla)

HTML / CSS for popup & overlay

Chrome Cookies API

📌 Future Improvements

Add persistent storage of granted/revoked permissions.

Improve cookie display with a styled table inside the overlay.

Export/import cookies as JSON.

📜 License

This project is licensed under the MIT License.


Developed by Pratibha Bharti.