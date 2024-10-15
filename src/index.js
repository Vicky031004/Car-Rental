function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("hidden");
}
function handleSelection(url) {
  if (url) {
    window.location.href = url;
  }
}
window.onclick = function (event) {
  const dropdown = document.getElementById("dropdown-menu");
  if (!event.target.matches(".dropdown-btn")) {
    if (!dropdown.classList.contains("hidden")) {
      dropdown.classList.add("hidden");
    }
  }
};
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}
function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.classList.toggle("hidden");
}
function handleSelection(page) {
  console.log("Selected:", page);
}
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

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const hourlyBtn = document.getElementById("hourlyBtn");
  const roundTripBtn = document.getElementById("roundTripBtn");

  // Set default trip type
  let tripType = "hourly";

  // Event listeners for trip type buttons
  hourlyBtn.addEventListener("click", () => {
    tripType = "hourly";
    hourlyBtn.classList.remove("bg-white", "text-white");
    hourlyBtn.classList.add("bg-black", "text-white");
    roundTripBtn.classList.remove("bg-black", "text-white");
    roundTripBtn.classList.add("bg-white", "text-black");
  });

  roundTripBtn.addEventListener("click", () => {
    tripType = "roundTrip";
    roundTripBtn.classList.remove("bg-white", "text-white");
    roundTripBtn.classList.add("bg-black", "text-white");
    hourlyBtn.classList.remove("bg-black", "text-white");
    hourlyBtn.classList.add("bg-white", "text-black");
  });

  // Event listener for search button
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Collect form data
    const pickupLocation = document.querySelector(
      'input[placeholder="Enter City, Airport or Station"]'
    ).value;
    const dropLocation = document.querySelectorAll(
      'input[placeholder="Enter City, Airport or Station"]'
    )[1].value;
    const pickupDate = document.querySelector('input[type="date"]').value;
    const pickupTime = document.querySelector('input[type="time"]').value;

    // Store form data in localStorage
    localStorage.setItem(
      "searchData",
      JSON.stringify({
        pickupLocation,
        dropLocation,
        pickupDate,
        pickupTime,
        tripType: tripType,
      })
    );

    // Log the stored data (for debugging)
    console.log(
      "Stored search data:",
      JSON.parse(localStorage.getItem("searchData"))
    );

    // Redirect to car selection page
    window.location.href = "Selection-Page.html";
  });

  console.log("Search script loaded");
});
