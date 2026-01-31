console.log("[Form Tracker] background.js running now");

const API_URL = "http://localhost:4000/api/form-events";

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type !== "FORM_SUBMIT") return;
  console.log("📨 RAW MESSAGE", message);
  sendToBackend(message.payload);
});

async function sendToBackend(payload) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(res.status);
    console.log("✅ Sent to backend");
  } catch (err) {
    console.error("❌ Failed to send", err);
  }
}
