chrome.storage.local.get("changes", (result) => {
  let changes = result.changes || [];
  let changesList = document.getElementById("changesList");
  let noChangesText = document.getElementById("noChanges");

  if (changes.length > 0) {
    noChangesText.style.display = "none";
    changes.forEach((change) => {
      let div = document.createElement("div");
      div.className = "change-item";
      div.innerHTML = `
        <strong>Key:</strong> <span class="key">${change.key}</span><br>
        <strong>New Value:</strong> <span class="value">${change.newValue}</span><br>
        <strong>Time:</strong> <span class="time">${new Date(change.timestamp).toLocaleString()}</span>
      `;
      changesList.appendChild(div);
    });
  } else {
    noChangesText.style.display = "block";
  }
});

document.getElementById("clearButton").addEventListener("click", () => {
  chrome.storage.local.set({ changes: [] }, function () {
    console.log("Changes cleared from storage.");
    document.getElementById("changesList").innerHTML =
      '<p id="noChanges">Nenhuma atualização encontrada.</p>';
    chrome.action.setBadgeText({ text: "" });
  });
});
