(function () {
  const originalSetItem = localStorage.setItem.bind(localStorage);
  const originalRemoveItem = localStorage.removeItem.bind(localStorage);

  localStorage.setItem = function (key, value) {
    console.log(`localStorage.setItem called: key=${key}, value=${value}`);
    originalSetItem(key, value);
    window.postMessage(
      {
        source: "localStorageWatcher",
        type: "LOCALSTORAGE_UPDATED",
        key,
        newValue: value,
      },
      "*"
    );
  };

  localStorage.removeItem = function (key) {
    console.log(`localStorage.removeItem called: key=${key}`);
    originalRemoveItem(key);
    window.postMessage(
      {
        source: "localStorageWatcher",
        type: "LOCALSTORAGE_UPDATED",
        key,
        newValue: null,
      },
      "*"
    );
  };
  console.log("localStorage methods overridden in injected script");
})();
