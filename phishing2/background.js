chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        chrome.storage.local.set({ currentUrl: changeInfo.url }, () => {
            console.log("URL updated in storage:", changeInfo.url);
        });
    }
});

// Fetch and update phishing sites list periodically
function updatePhishingSitesList() {
    fetch('https://api.example.com/phishing-sites')
        .then(response => response.json())
        .then(data => {
            chrome.storage.local.set({ phishingSites: data.sites }, () => {
                console.log("Phishing sites list updated.");
            });
        })
        .catch(error => {
            console.error("Failed to fetch phishing sites:", error);
        });
}

// Update the list every 24 hours
updatePhishingSitesList();
setInterval(updatePhishingSitesList, 24 * 60 * 60 * 1000);