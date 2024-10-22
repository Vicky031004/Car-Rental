// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Debug function to toggle the mobile menu
function toggleMenu() {
  console.log("toggleMenu function called");
  const menu = document.getElementById("menu");
  const menuButton = document.querySelector("button.lg\\:hidden");
  
  if (menu && menuButton) {
    console.log("Menu visibility before toggle:", menu.classList.contains("hidden") ? "hidden" : "visible");
    menu.classList.toggle("hidden");
    console.log("Menu visibility after toggle:", menu.classList.contains("hidden") ? "hidden" : "visible");
    
    // Toggle aria-expanded attribute
    const isExpanded = menu.classList.contains("hidden") ? "false" : "true";
    menuButton.setAttribute("aria-expanded", isExpanded);
    console.log("Button aria-expanded set to:", isExpanded);
  } else {
    console.error("Menu or button element not found");
    if (!menu) console.error("Menu element is missing");
    if (!menuButton) console.error("Menu button is missing");
  }
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

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event fired");

  // Attach click event to menu button
  const menuButton = document.querySelector("button.lg\\:hidden");
  if (menuButton) {
    console.log("Menu button found, attaching click event");
    menuButton.addEventListener("click", toggleMenu);
  } else {
    console.error("Menu button not found");
  }

  // Retrieve search data from localStorage
  const searchData = JSON.parse(localStorage.getItem("searchData"));

  // Display search data on the page
  if (searchData) {
    const searchSummary = document.createElement("div");
    searchSummary.classList.add(
      "bg-white",
      "p-4",
      "rounded-lg",
      "shadow-md",
      "mb-6"
    );
    searchSummary.innerHTML = `
      <h2 class="font-semibold text-xl mb-2">Your Search</h2>
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
    document
      .querySelector(".container")
      .insertBefore(
        searchSummary,
        document.querySelector(".container").firstChild
      );
  }

  // Log the retrieved data (for debugging)
  console.log("Retrieved search data:", searchData);

  // Add event listeners to all "Select" buttons
  const selectButtons = document.querySelectorAll(".bg-gray-900");
  selectButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const carCard = this.closest(".bg-white");
      const carName = carCard.querySelector("h2").textContent;
      const carPrice = carCard.querySelector(".text-2xl").textContent;

      // Store selected car data
      localStorage.setItem(
        "selectedCar",
        JSON.stringify({
          name: carName,
          price: carPrice,
        })
      );

      // Redirect to a booking confirmation page (you'll need to create this)
      window.location.href = "booking-confirmation.html";
    });
  });

  // Add event listener to "Back to Search" button
  const backButton = document.querySelector("#backToSearchBtn");
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }

  // Add event listener to sign in/up button
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

  // Close modal when clicking outside
  signModal.addEventListener("click", (e) => {
    if (e.target === signModal) {
      signModal.classList.add("hidden");
    }
  });

  // Switch between sign up and sign in
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

  // Handle form submission
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(isSignUp ? "Sign Up" : "Sign In", "submitted");
    signModal.classList.add("hidden");
  });
});

// Close dropdowns when clicking outside
window.onclick = function (event) {
  const dropdown = document.getElementById("dropdown-menu");
  if (!event.target.matches(".dropdown-btn")) {
    if (!dropdown.classList.contains("hidden")) {
      dropdown.classList.add("hidden");
    }
  }
};

// Log when the script runs
console.log("Full JavaScript for Car Selection Page loaded");