(function () {
  console.log("Content script loaded");
  chrome.runtime.sendMessage({ action: 'injectScript' });

  window.addEventListener('message', function (event) {
    if (event.source !== window) return;
    if (event.data && event.data.source === 'localStorageWatcher') {
      console.log("Message received from injected script:", event.data);

      chrome.runtime.sendMessage(event.data, response => {
        console.log("Message sent to background, response:", response);
      });
    }
  });
})();
