// Function to check for phishing keywords
function checkPhishing() {
    chrome.storage.local.get(['phishingKeywords'], (data) => {
        const phishingKeywords = data.phishingKeywords || ["login", "verify", "update", "account", "bank", "password", "urgent", "security"];
        const pageText = document.body.innerText.toLowerCase();
        const count = phishingKeywords.filter(word => new RegExp(`\\b${word}\\b`, 'i').test(pageText)).length;

        if (count > 3) {
            alert("⚠️ Warning: This website might be a phishing site!");
        }
    });
}

// Function to allow users to report phishing sites
function addReportButton() {
    const reportButton = document.createElement('button');
    reportButton.innerText = 'Report Phishing Site';
    reportButton.style.position = 'fixed';
    reportButton.style.bottom = '20px';
    reportButton.style.right = '20px';
    reportButton.style.zIndex = 1000;
    reportButton.style.backgroundColor = 'red';
    reportButton.style.color = 'white';
    reportButton.style.padding = '10px';
    reportButton.style.border = 'none';
    reportButton.style.borderRadius = '5px';
    reportButton.style.cursor = 'pointer';

    reportButton.onclick = () => {
        const url = window.location.href;
        fetch('https://api.example.com/report-phishing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        }).then(response => {
            if (response.ok) {
                alert('Thank you for reporting this site!');
            } else {
                alert('Failed to report the site. Please try again.');
            }
        });
    };

    document.body.appendChild(reportButton);
}

// Run checks and add report button
checkPhishing();
addReportButton();