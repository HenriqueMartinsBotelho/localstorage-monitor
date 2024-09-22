chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background:", message);

  if (message.action === "injectScript") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const activeTab = tabs[0];

        if (activeTab.id && activeTab.url.startsWith("http")) {
          chrome.scripting.executeScript(
            {
              target: { tabId: activeTab.id },
              files: ["injected.js"],
              world: "MAIN",
            },
            () => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Script injection failed:",
                  chrome.runtime.lastError.message
                );
              } else {
                console.log(
                  "Injected script successfully into the current tab"
                );
              }
            }
          );
        } else {
          console.error("Invalid active tab or unsupported URL");
        }
      } else {
        console.error("No active tab found");
      }
    });
  } else if (message.type === "LOCALSTORAGE_UPDATED") {
    console.log(
      `LocalStorage updated: key=${message.key}, newValue=${message.newValue}`
    );

    chrome.storage.local.get("changes", (result) => {
      let changes = result.changes || [];

      changes.push({
        key: message.key,
        newValue: message.newValue,
        timestamp: Date.now(),
      });

      chrome.storage.local.set({ changes: changes }, () => {
        console.log("Change saved to storage:", changes);
       chrome.action.setBadgeText({ text: changes.length.toString() });
      });
    });
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
