// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to toggle mobile menu
function toggleMenu() {
  console.log("toggleMenu function called");
  const menu = document.querySelector("nav > div > div:nth-child(2)");
  const menuButton = document.getElementById("menu-toggle");

  if (menu && menuButton) {
    console.log(
      "Menu visibility before toggle:",
      menu.classList.contains("hidden") ? "hidden" : "visible"
    );
    menu.classList.toggle("hidden");
    console.log(
      "Menu visibility after toggle:",
      menu.classList.contains("hidden") ? "hidden" : "visible"
    );

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

// Function to toggle dropdown visibility
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("hidden");
}

// Function to display search data
function displaySearchData(data) {
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
        <span>${capitalizeFirstLetter(data.tripType)}</span>
        
        <strong>Pickup Location</strong>
        <span>:</span>
        <span>${capitalizeFirstLetter(data.pickupLocation)}</span>
        
        <strong>Drop-off Location</strong>
        <span>:</span>
        <span>${capitalizeFirstLetter(data.dropLocation)}</span>
        
        <strong>Date</strong>
        <span>:</span>
        <span>${data.pickupDate}</span>
        
        <strong>Time</strong>
        <span>:</span>
        <span>${data.pickupTime}</span>
        
        <strong>Driver</strong>
        <span>:</span>
        <span>Acting Driver</span>
      </div>
    `;

  const mainContent = document.querySelector("main");
  mainContent.insertBefore(searchSummary, mainContent.firstChild);
}

// Function to display no search message
function displayNoSearchMessage() {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add(
    "bg-yellow-100",
    "border-l-4",
    "border-yellow-500",
    "text-yellow-700",
    "p-4",
    "mb-8"
  );
  messageContainer.innerHTML = `
      <p class="font-bold">No search data found</p>
      <p>Please go back to the homepage and search for an acting driver.</p>
    `;

  const mainContent = document.querySelector("main");
  mainContent.insertBefore(messageContainer, mainContent.firstChild);
}

// Function to filter drivers
function filterDrivers(searchData) {
  const driverCards = document.querySelectorAll(".driver-card");
  driverCards.forEach((card) => {
    card.style.display =
      searchData.driverOption === "driverOnly" ? "block" : "none";
  });
}

// Function to handle booking
function handleBooking(event) {
  const driverCard = event.target.closest("div");
  const driverName = driverCard.querySelector("h2").textContent;
  const searchData = JSON.parse(localStorage.getItem("searchData"));

  if (searchData) {
    alert(`Booking process initiated for ${driverName}.\n
        Pick-up: ${searchData.pickupLocation} on ${searchData.pickupDate} at ${searchData.pickupTime}\n
        Drop-off: ${searchData.dropLocation} on ${searchData.returnDate} at ${searchData.returnTime}`);
  } else {
    alert(
      `Booking process initiated for ${driverName}. No search data available.`
    );
  }
  // Here you would typically initiate the booking process,
  // perhaps by opening a modal or navigating to a booking page
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event fired for acting-driver.js");

  // Retrieve search data from localStorage
  const searchData = JSON.parse(localStorage.getItem("searchData"));

  // Display search data if available
  if (searchData && searchData.driverOption === "driverOnly") {
    displaySearchData(searchData);
    filterDrivers(searchData);
  } else {
    displayNoSearchMessage();
  }

  // Set up event listeners for booking buttons
  const bookButtons = document.querySelectorAll("button");
  bookButtons.forEach((button) => {
    if (button.textContent === "Book Now") {
      button.addEventListener("click", handleBooking);
    }
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  // Dropdown functionality
  const dropdownBtn = document.querySelector(".group > button");
  if (dropdownBtn) {
    dropdownBtn.addEventListener("click", () =>
      toggleDropdown("dropdown-menu")
    );
  }

  // Log the retrieved data (for debugging)
  console.log("Retrieved search data:", searchData);

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
  if (!event.target.matches(".group > button")) {
    const dropdowns = document.getElementsByClassName("group-hover:block");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (!openDropdown.classList.contains("hidden")) {
        openDropdown.classList.add("hidden");
      }
    }
  }
};

// Log when the script runs
console.log("Full JavaScript for Acting Driver Page loaded");
