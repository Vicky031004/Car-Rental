// Function to toggle dropdown visibility
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("hidden");
}

// Function to handle selection and navigation
function handleSelection(url) {
  if (url) {
    window.location.href = url;
  }
}

// Close dropdown when clicking outside
window.onclick = function (event) {
  const dropdown = document.getElementById("dropdown-menu");
  if (!event.target.matches(".dropdown-btn")) {
    if (!dropdown.classList.contains("hidden")) {
      dropdown.classList.add("hidden");
    }
  }
};

// Function to toggle mobile menu
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

// Function to check if all fields are filled
function areAllFieldsFilled() {
  const requiredFields = [
    "pickupLocation",
    "dropLocation",
    "pickupDate",
    "pickupTime",
    "returnDate",
    "returnTime",
  ];

  return requiredFields.every(
    (field) => document.getElementById(field).value.trim() !== ""
  );
}

// Function to check if either "With Driver" or "Without Driver" is selected
function isDriverOptionSelected() {
  return (
    document.getElementById("withDriverBtn").classList.contains("bg-black") ||
    document.getElementById("withoutDriverBtn").classList.contains("bg-black")
  );
}

// Function to handle driver option button clicks
function handleDriverButtonClick(buttonId) {
  const buttons = [
    "withDriverBtn",
    "withoutDriverBtn",
    "driverOnlyBtn",
    "goodsBtn",
  ];
  buttons.forEach((btn) => {
    const button = document.getElementById(btn);
    if (btn === buttonId) {
      button.classList.remove("bg-white","text-black");
      button.classList.add("bg-black", "text-white");
    } 
    else {
      button.classList.remove("bg-black", "text-white");
      button.classList.add("bg-white","text-black");
    }
    button.classList.add("border-2", "border-black");
  });
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Sign in/up modal functionality
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

  // Search functionality
  const searchBtn = document.getElementById("searchBtn");
  const hourlyBtn = document.getElementById("hourlyBtn");
  const roundTripBtn = document.getElementById("roundTripBtn");

  // Set default trip type
  let tripType = "hourly";

  // Initialize button styles
  hourlyBtn.classList.add("bg-black", "text-white");
  roundTripBtn.classList.add(
    "bg-white",
    "text-black",
    "border-2",
    "border-black"
  );

  // Event listeners for trip type buttons
  hourlyBtn.addEventListener("click", () => {
    tripType = "hourly";
    hourlyBtn.classList.remove(
      "bg-white",
      "text-black",
      "border-2",
      "border-black"
    );
    hourlyBtn.classList.add("bg-black", "text-white");
    roundTripBtn.classList.remove("bg-black", "text-white");
    roundTripBtn.classList.add(
      "bg-white",
      "text-black",
      "border-2",
      "border-black"
    );
  });

  roundTripBtn.addEventListener("click", () => {
    tripType = "roundTrip";
    roundTripBtn.classList.remove(
      "bg-white",
      "text-black",
      "border-2",
      "border-black"
    );
    roundTripBtn.classList.add("bg-black", "text-white");
    hourlyBtn.classList.remove("bg-black", "text-white");
    hourlyBtn.classList.add(
      "bg-white",
      "text-black",
      "border-2",
      "border-black"
    );
  });

  // Event listeners for driver option buttons
  const driverButtons = [
    "withDriverBtn",
    "withoutDriverBtn",
    "driverOnlyBtn",
    "goodsBtn",
  ];
  driverButtons.forEach((btn) => {
    const button = document.getElementById(btn);
    // Set initial style with black text
    button.classList.add("bg-white", "text-black", "border-2", "border-black");
    button.addEventListener("click", function () {
      handleDriverButtonClick(btn);
    });
  });

  // Event listener for search button
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (areAllFieldsFilled()) {
      // Collect form data
      const pickupLocation = document.getElementById("pickupLocation").value;
      const dropLocation = document.getElementById("dropLocation").value;
      const pickupDate = document.getElementById("pickupDate").value;
      const pickupTime = document.getElementById("pickupTime").value;
      const returnDate = document.getElementById("returnDate").value;
      const returnTime = document.getElementById("returnTime").value;

      // Store form data in localStorage
      localStorage.setItem(
        "searchData",
        JSON.stringify({
          pickupLocation,
          dropLocation,
          pickupDate,
          pickupTime,
          returnDate,
          returnTime,
          tripType: tripType,
        })
      );

      // Log the stored data (for debugging)
      console.log(
        "Stored search data:",
        JSON.parse(localStorage.getItem("searchData"))
      );

      // Check which driver option is selected
      if (document.getElementById("withDriverBtn").classList.contains("bg-black") ||
          document.getElementById("withoutDriverBtn").classList.contains("bg-black")) {
        // Redirect to car selection page for "With Driver" or "Without Driver"
        window.location.href = "Selection-Page.html";
      } else {
        // Refresh the page for "Driver Only" and "Goods"
        window.location.reload();
      }
    } else {
      alert("Please fill in all fields");
    }
  });

  console.log("Search script loaded");
});