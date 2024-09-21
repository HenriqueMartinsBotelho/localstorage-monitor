console.log("Background script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background:", message);
  if (message.action === "injectScript") {
    // Inject the script into the page
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        files: ["injected.js"],
        world: "MAIN",
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Script injection failed:", chrome.runtime.lastError);
        } else {
          console.log("Injected script successfully");
        }
      }
    );
  } else if (message.action === "injectScript") {
    // Inject the script into the page
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        files: ["injected.js"],
        world: "MAIN",
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Script injection failed:", chrome.runtime.lastError);
        } else {
          console.log("Injected script successfully");
        }
      }
    );
  } else {
    console.log("Unrecognized message type:", message.type);
  }
  sendResponse({ received: true });
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed, creating keepAlive alarm");
  chrome.alarms.create("keepAlive", { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "keepAlive") {
    console.log("KeepAlive alarm triggered");
  }
});
