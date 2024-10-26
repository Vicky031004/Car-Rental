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
  const driverCard = event.target.closest(".bg-white.shadow-md.rounded-lg");
  const driverName = driverCard.querySelector("h2").textContent;
  const driverDescription = driverCard.querySelector("p").textContent;

  // Store selected driver information
  const selectedDriver = {
    name: driverName,
    description: driverDescription
  };
  localStorage.setItem("selectedDriver", JSON.stringify(selectedDriver));

  // Redirect to the confirmation page
  window.location.href = "../Acting_Confirm_Page/acting_confirm_page.html";
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
  const bookNowButtons = document.querySelectorAll('.book-now-btn');
  
  bookNowButtons.forEach(button => {
    button.addEventListener('click', handleBooking);
  });

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

// Log when the script runs
console.log("Full JavaScript for Acting Driver Page loaded");
