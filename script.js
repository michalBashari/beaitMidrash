// DOM elements
const recipientNameSpan = document.getElementById('recipientName');
const nameInput = document.getElementById('nameInput');
const popupOverlay = document.getElementById('popupOverlay');
const donorInput = document.getElementById('donorInput');
const fromInput = document.getElementById('fromInput');
const donorInfo = document.getElementById('donorInfo');

// Load saved data on page load
window.addEventListener('load', function() {
    loadSavedData();
});

// Update recipient name as user types
nameInput.addEventListener('input', function() {
    const name = this.value.trim();
    recipientNameSpan.textContent = name || '_______';
    localStorage.setItem('recipientName', name);
});

// Open donor popup when logo is clicked
function openDonorPopup() {
    loadCurrentData();
    popupOverlay.style.display = 'flex';
    donorInput.focus();
}

// Close popup
function closePopup() {
    popupOverlay.style.display = 'none';
}

// Save donation info
function saveDonationInfo() {
    const donorName = donorInput.value.trim();
    const fromText = fromInput.value.trim();
    
    localStorage.setItem('donorName', donorName);
    localStorage.setItem('fromText', fromText);
    
    updateDonorDisplay(donorName, fromText);
    closePopup();
}

// Save donor name (for backward compatibility)
function saveDonorName() {
    saveDonationInfo();
}

// Update donor info display
function updateDonorDisplay(donorName, fromText) {
    let displayText = '';
    
    if (donorName && fromText) {
        displayText = `תורם: ${donorName} | מאת: ${fromText}`;
    } else if (donorName) {
        displayText = `תורם: ${donorName}`;
    } else if (fromText) {
        displayText = `מאת: ${fromText}`;
    }
    
    donorInfo.textContent = displayText;
}

// Load current data into popup
function loadCurrentData() {
    donorInput.value = localStorage.getItem('donorName') || '';
    fromInput.value = localStorage.getItem('fromText') || '';
}

// Load all saved data
function loadSavedData() {
    const savedRecipient = localStorage.getItem('recipientName');
    if (savedRecipient) {
        nameInput.value = savedRecipient;
        recipientNameSpan.textContent = savedRecipient;
    }
    
    const donorName = localStorage.getItem('donorName');
    const fromText = localStorage.getItem('fromText');
    updateDonorDisplay(donorName, fromText);
}

// Close popup when clicking outside
popupOverlay.addEventListener('click', function(e) {
    if (e.target === popupOverlay) {
        closePopup();
    }
});

// Handle Enter key in inputs
nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        this.blur();
    }
});

donorInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fromInput.focus();
    }
});

fromInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        saveDonationInfo();
    }
});

// Handle Escape key to close popup
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
        closePopup();
    }
});