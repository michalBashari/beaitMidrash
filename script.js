// DOM elements
const recipientNameSpan = document.getElementById('recipientName');
const donorNameSpan = document.getElementById('donorName');
const nameInput = document.getElementById('nameInput');
const popupOverlay = document.getElementById('popupOverlay');
const donorInput = document.getElementById('donorInput');

// Update recipient name as user types
nameInput.addEventListener('input', function() {
    const name = this.value.trim();
    recipientNameSpan.textContent = name || '_______';
});

// Open donor popup when logo is clicked
function openDonorPopup() {
    popupOverlay.style.display = 'flex';
    donorInput.focus();
    // Pre-fill with current donor name if exists
    const currentDonor = donorNameSpan.textContent;
    if (currentDonor !== '_______') {
        donorInput.value = currentDonor;
    }
}

// Close popup
function closePopup() {
    popupOverlay.style.display = 'none';
    donorInput.value = '';
}

// Save donor name
function saveDonorName() {
    const donorName = donorInput.value.trim();
    if (donorName) {
        donorNameSpan.textContent = donorName;
    }
    closePopup();
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
        saveDonorName();
    }
});

// Handle Escape key to close popup
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
        closePopup();
    }
});