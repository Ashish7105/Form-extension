console.log("[Form Tracker] content.js loaded");

const formState = {};
let submitted = false;

function isGoogleForms() {
  return location.hostname === "docs.google.com";
}

document.addEventListener(
  "input",
  (e) => {
    if (!isGoogleForms() || submitted) return;

    const el = e.target;
    if (!el) return;

    const isTextInput =
      el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.getAttribute("role") === "textbox";

    if (!isTextInput) return;

    // Get question text
    const question =
      el.closest('[role="listitem"]')
        ?.querySelector('[role="heading"]')
        ?.innerText ||
      el.getAttribute("aria-label") ||
      "unknown_question";

    const value = el.value ?? el.innerText ?? "";

    formState[question] = {
      tag: el.tagName,
      value,
    };
  },
  true
);

document.addEventListener(
  "click",
  (e) => {
    const btn = e.target.closest('div[role="button"]');
    if (!btn) return;

    const text = btn.innerText?.toLowerCase();
    if (!text?.includes("submit")) return;

    if (submitted) return;
    submitted = true;

    chrome.runtime.sendMessage({
      type: "FORM_SUBMIT",
      payload: {
        pageUrl: location.href,
        source: "google_forms",
        fields: { ...formState },
        timestamp: new Date().toISOString(),
      },
    });

    console.log("📤 Google Form submitted", formState);

    // Reset safely
    setTimeout(() => {
      submitted = false;
      Object.keys(formState).forEach((k) => delete formState[k]);
    }, 3000);
  },
  true
);