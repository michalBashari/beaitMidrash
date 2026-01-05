const logoUpload = document.getElementById('logoUpload');
const logo = document.getElementById('logo');
const nameInput = document.getElementById('nameInput');
const recipientName = document.getElementById('recipientName');
const popupOverlay = document.getElementById('popupOverlay');
const donorInput = document.getElementById('donorInput');

// Logo click event for donor popup
logo.addEventListener('click', function() {
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
});

// Popup functions
function saveDonorName() {
    const donorName = donorInput.value.trim();
    if (donorName) {
        // You can save the donor name or display it somewhere
        console.log('Donor name:', donorName);
        // Optional: Add donor name to the page
        logo.title = `תורם: ${donorName}`;
    }
    closePopup();
}

function closePopup() {
    popupOverlay.style.display = 'none';
    donorInput.value = '';
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