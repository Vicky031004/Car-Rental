document.addEventListener("DOMContentLoaded", function () {
    // Retrieve search data and selected driver from localStorage
    const searchData = JSON.parse(localStorage.getItem("searchData"));
    const selectedDriver = JSON.parse(localStorage.getItem("selectedDriver"));

    // Populate booking details
    const bookingDetails = document.getElementById("bookingDetails");
    if (searchData) {
        bookingDetails.innerHTML = `
      <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 0.5rem 0.5rem; align-items: baseline;">
        <strong>Trip Type</strong>
        <span>:</span>
        <span>${capitalizeFirstLetter(searchData.tripType || "Acting Driver")}</span>
        
        <strong>Pickup</strong>
        <span>:</span>
        <span>${capitalizeFirstLetter(searchData.pickupLocation)}</span>
        
        <strong>Drop-off</strong>
        <span>:</span>
        <span>${capitalizeFirstLetter(searchData.dropLocation)}</span>
        
        <strong>Date</strong>
        <span>:</span>
        <span>${searchData.pickupDate}</span>
        
        <strong>Time</strong>
        <span>:</span>
        <span>${searchData.pickupTime}</span>
      </div>
        `;
    }

    // Populate selected driver details
    const selectedDriverElement = document.getElementById("selectedDriver");
    if (selectedDriver) {
        selectedDriverElement.innerHTML = `
            <div class="flex items-center">
                <img src="../img/speedo.jpg" alt="${selectedDriver.name}" class="w-24 h-24 object-cover rounded-lg mr-4">
                <div>
                    <h3 class="font-semibold text-xl">${selectedDriver.name}</h3>
                    <p class="text-gray-600">${selectedDriver.description}</p>
                </div>
            </div>
        `;
    }

    // Add event listener for Modify Booking button
    const modifyBookingBtn = document.getElementById("modifyBookingBtn");
    modifyBookingBtn.addEventListener("click", function() {
        window.location.href = "../Acting_Selection/acting_selection.html";
    });

    // Add event listener for Confirm Booking button
    const confirmBookingBtn = document.getElementById("confirmBookingBtn");
    confirmBookingBtn.addEventListener("click", function() {
        window.location.href="../Goods_Final_Page/goods_final_page.html";
    });
});

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to toggle dropdowns
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle("hidden");
}

// Function to handle selection
function handleSelection(url) {
    if (url) {
        window.location.href = url;
    }
}

// Toggle menu function for mobile
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
}

// Add event listener for menu toggle button
document.querySelector("button.lg\\:hidden").addEventListener("click", toggleMenu);

// Close dropdowns when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.getElementsByClassName("absolute");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (!openDropdown.classList.contains('hidden')) {
                openDropdown.classList.add('hidden');
            }
        }
    }
};

// Sign in/up modal functionality (same as in the car confirm page)
document.addEventListener("DOMContentLoaded", function () {
    const signBtns = document.querySelectorAll(".sign-in-up-btn");
    const signModal = document.getElementById("signModal");
    const modalTitle = document.getElementById("modalTitle");
    const switchAuth = document.getElementById("switchAuth");
    const nameField = document.getElementById("nameField");
    const authForm = document.getElementById("authForm");
  
    let isSignUp = true;
  
    signBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        signModal.classList.remove("hidden");
      });
    });
  
    signModal.addEventListener("click", (e) => {
      if (e.target === signModal) {
        signModal.classList.add("hidden");
      }
    });
  
    switchAuth.addEventListener("click", (e) => {
      e.preventDefault();
      isSignUp = !isSignUp;
      if (isSignUp) {
        modalTitle.textContent = "Sign Up";
        switchAuth.textContent = "Already have an account? Sign In";
        nameField.style.display = "block";
      } else {
        modalTitle.textContent = "Sign In";
        switchAuth.textContent = "Don't have an account? Sign Up";
        nameField.style.display = "none";
      }
    });
  
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(isSignUp ? "Sign Up" : "Sign In", "submitted");
      signModal.classList.add("hidden");
    });
});
