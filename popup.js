console.log("Popup script loaded");

// Recuperar e exibir as alterações armazenadas
chrome.storage.local.get("changes", (result) => {
  let changes = result.changes || [];
  let changesList = document.getElementById("changesList");
  let noChangesText = document.getElementById("noChanges");

  if (changes.length > 0) {
    noChangesText.style.display = "none";
    changes.forEach((change) => {
      let div = document.createElement("div");
      div.className = "change-item";
      div.textContent = `Key: ${change.key}, New Value: ${change.newValue}, Time: ${new Date(
        change.timestamp
      ).toLocaleString()}`;
      changesList.appendChild(div);
    });
  } else {
    noChangesText.style.display = "block";
  }
});

// Limpar as alterações e o badge ao clicar no botão
document.getElementById("clearButton").addEventListener("click", () => {
  chrome.storage.local.set({ changes: [] }, function () {
    console.log("Changes cleared from storage.");
    document.getElementById("changesList").innerHTML = '<p id="noChanges">Nenhuma atualização encontrada.</p>';
    // Limpar o badge
    chrome.action.setBadgeText({ text: "" });
  });
});
