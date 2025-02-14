const statusText = document.getElementById('status');
const refreshButton = document.getElementById('refresh-button');
const loadingSpinner = document.getElementById('loading-spinner');

// Function to show loading spinner
function showLoading() {
    statusText.textContent = 'Checking site...';
    loadingSpinner.style.display = 'block';
}

// Function to hide loading spinner
function hideLoading() {
    loadingSpinner.style.display = 'none';
}

// Function to check URL safety
function checkUrlSafety(url) {
    showLoading();
    chrome.storage.local.get(['phishingSites'], (data) => {
        const phishingSites = data.phishingSites || ["example-phishing.com", "fake-bank.com", "scam-login.net"];
        const hostname = new URL(url).hostname;

        setTimeout(() => { // Simulate a delay for demonstration
            hideLoading();
            if (phishingSites.includes(hostname)) {
                statusText.innerHTML = `<span style="color:red;">🚨 This site is flagged as a phishing website!</span>`;
            } else {
                statusText.innerHTML = `<span style="color:green;">✅ This site appears safe.</span>`;
            }
        }, 1000); // Simulate a 1-second delay
    });
}

// Load current URL and check safety
chrome.storage.local.get('currentUrl', (data) => {
    if (data.currentUrl) {
        checkUrlSafety(data.currentUrl);
    } else {
        statusText.innerHTML = `<span style="color:orange;">⚠️ Unable to determine the safety of this site.</span>`;
    }
});

// Refresh button to recheck the URL
refreshButton.onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;
        chrome.storage.local.set({ currentUrl: url }, () => {
            checkUrlSafety(url);
        });
    });
};