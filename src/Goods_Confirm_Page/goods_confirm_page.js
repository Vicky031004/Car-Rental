document.addEventListener("DOMContentLoaded", function () {
    // Retrieve search data and goods details from localStorage
    const searchData = JSON.parse(localStorage.getItem("searchData"));
    const goodsData = JSON.parse(localStorage.getItem("goodsData"));

    // Populate booking details
    const bookingDetails = document.getElementById("bookingDetails");
    if (searchData) {
        bookingDetails.innerHTML = `
        <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 0.5rem 0.5rem; align-items: baseline;">
            <strong>Trip Type</strong>
            <span>:</span>
            <span>${capitalizeFirstLetter(searchData.tripType)}</span>
            
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

    // Populate goods details
    const goodsDetails = document.getElementById("goodsDetails");
    if (goodsData) {
        goodsDetails.innerHTML = `
        <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 0.5rem 0.5rem; align-items: baseline;">
            <strong>Type of Goods</strong>
            <span>:</span>
            <span>${capitalizeFirstLetter(goodsData.type)}</span>
            
            <strong>Weight</strong>
            <span>:</span>
            <span>${goodsData.weight} kg</span>
            
            <strong>Dimensions</strong>
            <span>:</span>
            <span>${goodsData.length} x ${goodsData.width} x ${goodsData.height} cm</span>
        </div>
        `;
    }

    // Add event listener for Modify Booking button
    const modifyBookingBtn = document.getElementById("modifyBookingBtn");
    modifyBookingBtn.addEventListener("click", function() {
        window.location.href="../Goods_Selection/goods_page.html";
    });

    // Add event listener for Confirm Booking button
    const confirmBookingBtn = document.getElementById("confirmBookingBtn");
    confirmBookingBtn.addEventListener("click", function() {
        window.location.href="../Goods_Final_Page/goods_final_page.html";
    });

    // Sign-in popup functionality
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
