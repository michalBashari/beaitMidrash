const logoUpload = document.getElementById('logoUpload');
const logo = document.getElementById('logo');
const nameInput = document.getElementById('nameInput');
const recipientName = document.getElementById('recipientName');
const popupOverlay = document.getElementById('popupOverlay');
const donorInput = document.getElementById('donorInput');
const fromInput = document.getElementById('fromInput');
const donorInfo = document.getElementById('donorInfo');

// Load saved data on page load
window.addEventListener('load', function() {
    loadSavedData();
});

// Logo click event for donor popup
logo.addEventListener('click', function() {
    loadCurrentData();
    popupOverlay.style.display = 'flex';
    donorInput.focus();
});

// Logo upload functionality
logoUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logo.src = e.target.result;
            logo.style.animation = 'bounceIn 1s ease-out';
            // Save logo to localStorage
            localStorage.setItem('donationLogo', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Recipient name input
nameInput.addEventListener('input', function(e) {
    const name = e.target.value.trim();
    recipientName.textContent = name || '_______';
    
    if (name) {
        recipientName.style.animation = 'rainbow 2s ease-in-out infinite';
    }
    
    // Save recipient name to localStorage
    localStorage.setItem('recipientName', name);
});

// Save donation info (donor and from)
function saveDonationInfo() {
    const donorName = donorInput.value.trim();
    const fromText = fromInput.value.trim();
    
    // Save to localStorage
    localStorage.setItem('donorName', donorName);
    localStorage.setItem('fromText', fromText);
    
    // Update display
    updateDonorDisplay(donorName, fromText);
    
    closePopup();
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
    logo.title = displayText;
}

// Load current data into popup
function loadCurrentData() {
    donorInput.value = localStorage.getItem('donorName') || '';
    fromInput.value = localStorage.getItem('fromText') || '';
}

// Load all saved data
function loadSavedData() {
    // Load logo
    const savedLogo = localStorage.getItem('donationLogo');
    if (savedLogo) {
        logo.src = savedLogo;
    }
    
    // Load recipient name
    const savedRecipient = localStorage.getItem('recipientName');
    if (savedRecipient) {
        nameInput.value = savedRecipient;
        recipientName.textContent = savedRecipient;
        if (savedRecipient) {
            recipientName.style.animation = 'rainbow 2s ease-in-out infinite';
        }
    }
    
    // Load donor info
    const donorName = localStorage.getItem('donorName');
    const fromText = localStorage.getItem('fromText');
    updateDonorDisplay(donorName, fromText);
}

// Close popup
function closePopup() {
    popupOverlay.style.display = 'none';
}

// Close popup on overlay click
popupOverlay.addEventListener('click', function(e) {
    if (e.target === popupOverlay) {
        closePopup();
    }
});

// Close popup on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Text pulsing effect
setInterval(() => {
    recipientName.style.transform = 'scale(1.05)';
    setTimeout(() => {
        recipientName.style.transform = 'scale(1)';
    }, 200);
}, 3000);