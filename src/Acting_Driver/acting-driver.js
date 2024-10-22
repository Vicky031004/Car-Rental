// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to toggle mobile menu
function toggleMenu() {
  console.log("toggleMenu function called");
  const menu = document.getElementById("menu");
  const menuButton = document.getElementById("menu-toggle");

  if (menu && menuButton) {
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");

    // Toggle button icon
    menuButton.querySelector(".open-icon").classList.toggle("hidden");
    menuButton.querySelector(".close-icon").classList.toggle("hidden");
  } else {
    console.error("Menu or button element not found");
  }
}

function toggleDropdown(dropdownId) {
  console.log("toggleDropdown called with id:", dropdownId);
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    console.log("Dropdown found, current hidden state:", dropdown.classList.contains("hidden"));
    dropdown.classList.toggle("hidden");
    console.log("Dropdown toggled, new hidden state:", dropdown.classList.contains("hidden"));
  } else {
    console.error("Dropdown element not found:", dropdownId);
  }
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
    <h2 class="font-bold text-xl mb-4">Your Search</h2>
    <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 0.5rem 0.5rem; align-items: baseline;">
      <strong>Pickup Location</strong>
      <span>:</span>
      <span>${capitalizeFirstLetter(data.pickupLocation)}</span>
      
      <strong>Drop-off Location</strong>
      <span>:</span>
      <span>${capitalizeFirstLetter(data.dropLocation)}</span>
      
      <strong>Date</strong>
      <span>:</span>
      <span>${data.pickupDate || "N/A"}</span>
      
      <strong>Time</strong>
      <span>:</span>
      <span>${data.pickupTime || "N/A"}</span>
      
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
  const driverCard = event.target.closest(".driver-card");
  const driverName = driverCard.querySelector("h2").textContent;
  const searchData = JSON.parse(localStorage.getItem("searchData"));

  console.log("Booking initiated for:", driverName);
  console.log("Search data:", searchData);

  if (searchData && searchData.pickupLocation && searchData.dropLocation) {
    alert(`Booking process initiated for ${driverName}.\n
      Pick-up: ${searchData.pickupLocation} on ${
      searchData.pickupDate || "N/A"
    } at ${searchData.pickupTime || "N/A"}\n
      Drop-off: ${searchData.dropLocation} on ${
      searchData.returnDate || "N/A"
    } at ${searchData.returnTime || "N/A"}`);
  } else {
    alert(
      `Booking process initiated for ${driverName}. No complete search data available.`
    );
  }

  // Here you would typically initiate the booking process,
  // perhaps by opening a modal or navigating to a booking page
}

// Function to toggle booking options dropdown
function toggleBookingOptions(event) {
  console.log("Toggle booking options called");
  const dropdown = event.target.nextElementSibling;
  if (dropdown) {
    dropdown.classList.toggle("hidden");
  } else {
    console.error("Dropdown element not found");
  }
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event fired for acting-driver.js");

  // Retrieve search data from localStorage
  const searchData = JSON.parse(localStorage.getItem("searchData"));
  console.log("Retrieved search data:", searchData);

  // Display search data if available
  if (searchData && searchData.driverOption === "driverOnly") {
    displaySearchData(searchData);
    filterDrivers(searchData);
  } else {
    displayNoSearchMessage();
  }

  // Set up event listeners for booking buttons
  const bookButtons = document.querySelectorAll(".book-now-btn");
  bookButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      console.log("Book Now button clicked");
      toggleBookingOptions(event);
    });
  });

  // Set up event listeners for booking options
  const bookingOptions = document.querySelectorAll(".booking-option");
  bookingOptions.forEach((option) => {
    option.addEventListener("click", handleBooking);
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
    console.log("Menu toggle event listener added");
  } else {
    console.error("Menu toggle button not found");
  }

  // Dropdown functionality
  const dropdownBtn = document.querySelector(".dropdown-btn");
  if (dropdownBtn) {
    dropdownBtn.addEventListener("click", function(event) {
      event.preventDefault();
      event.stopPropagation();
      console.log("Dropdown button clicked");
      toggleDropdown("dropdown-menu");
    });
    console.log("Dropdown event listener added");
  } else {
    console.error("Dropdown button not found");
  }


  // Add event listener to "Back to Search" button
  const backButton = document.querySelector("#backToSearchBtn");
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }

  // Add event listener to booking button in navbar
  const bookingNavBtn = document.querySelector(".booking-nav-btn");
  if (bookingNavBtn) {
    bookingNavBtn.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Booking nav button clicked");
      toggleDropdown("dropdown-menu");
    });
  } else {
    console.error("Booking nav button not found");
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
      console.log("Sign button clicked");
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
  if (!event.target.matches(".book-now-btn")) {
    const dropdowns = document.querySelectorAll(".booking-options");
    dropdowns.forEach((openDropdown) => {
      if (!openDropdown.classList.contains("hidden")) {
        openDropdown.classList.add("hidden");
      }
    });
  }
};

// Log when the script runs
console.log("Full JavaScript for Acting Driver Page loaded");
